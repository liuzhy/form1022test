﻿using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FormParser.Pdf;
using System.IO;

namespace Form1022WebApi.Controllers
{
    [ApiController]
    public class Form1022Controller : ControllerBase
    {
        private readonly ILogger<Form1022Controller> _logger;

        public Form1022Controller(ILogger<Form1022Controller> logger)
        {
            _logger = logger;
        }

        string pdfroot
        {
            get{
                return AppContext.BaseDirectory;
            }
        }

        [HttpGet]
        [Route("api/form")]

        public List<string> GetAllForms()
        {
            var files = Directory.GetFiles(pdfroot,"*.pdf");
            var newf = new List<string>();
            foreach(string f in files)
            {
                 newf.Add(Path.GetFileNameWithoutExtension(f));
            }
            return newf;
        }

        [HttpGet]
        [Route("api/form/{formid}")]
        public int GetAllForms(string formid)
        {
            var pdffile = Path.Combine(pdfroot,formid+".pdf");
            if(System.IO.File.Exists(pdffile))
            {
                var pdfDoc = new PdfParser(pdffile);
                return pdfDoc.GetPageNumber();
            }
            else
                return -1;
        }

        [HttpGet]
        [Route("api/form/{formid}/{pageid}")]
        public List<Dictionary<string, object>> GetPage(string formid,int pageid)
        {
            var configfile = Path.Combine(pdfroot,string.Format("{0}.{1}.json",formid,pageid));
            if(System.IO.File.Exists(configfile)){
                var sr = new StreamReader(configfile);
                var result = sr.ReadToEnd();
                sr.Close();
                var jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Dictionary<string,object>>>(result);
                return jsonObj;
            }

            var pdffile = Path.Combine(pdfroot,formid+".pdf");
            var pdfDoc = new PdfParser(pdffile);
            if(pageid>pdfDoc.GetPageNumber() || pageid<1)
                return null;
            var newpdf = Path.Combine(pdfroot,string.Format("{0}.{1}.pdf",formid,pageid));
            if(pdfDoc.PageToNewPdf(pageid,newpdf))
            {
                var result =new PdfParser(newpdf).GetFieldsInfo();

                {
                    var jsonstring = Newtonsoft.Json.JsonConvert.SerializeObject(result);
                    var sw = new StreamWriter(configfile);
                    sw.Write(jsonstring);
                    sw.Close();
                }
                return result;
            }
            else
                return null;            
        }

        [HttpPost]
        [Route("api/form/{formid}/{pageid}")]
        public bool PostPageForm(string formid,int pageid,Dictionary<string,string> formdata)
        {
            var configfile = Path.Combine(pdfroot,string.Format("{0}.{1}.json",formid,pageid));
            if(System.IO.File.Exists(configfile)){
                var sr = new StreamReader(configfile);
                var result = sr.ReadToEnd();
                sr.Close();
                var jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Dictionary<string,string>>>(result);
                foreach(var s in jsonObj)
                {
                    var key = s["key"];
                    if(formdata.Keys.Contains(key))
                        s["value"] = formdata[key];
                }
                var sw = new StreamWriter(configfile);
                sw.Write(Newtonsoft.Json.JsonConvert.SerializeObject(jsonObj));
                sw.Close();
                return true;
            }
            else
                return false;
        }

        [HttpGet]
        [Route("api/download/{formid}/{pageid}")]
        public HttpResponseMessage GetFile(string formid,int pageid)
        {
            var configfile = Path.Combine(pdfroot,string.Format("{0}.{1}.json",formid,pageid));
            if(System.IO.File.Exists(configfile)){
                var sr = new StreamReader(configfile);
                var result = sr.ReadToEnd();
                sr.Close();
                var jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Dictionary<string,string>>>(result);

                var pdffile = Path.Combine(pdfroot,formid+".pdf");
                var pdfDoc = new PdfParser(pdffile);
                if(pageid>pdfDoc.GetPageNumber() || pageid<1)
                    return null;
                var newpdf = Path.Combine(pdfroot,string.Format("{0}.{1}.pdf",formid,pageid));
                if(pdfDoc.PageToNewPdf(pageid,newpdf))
                {
                    var pdfDocForm = new PdfParser(newpdf);
                    if(pdfDocForm.GetFieldsInfo().Count<1)
                        return null;
                    // edit post content
                    pdfDocForm.SetFieldsValues(jsonObj,Path.Combine(pdfroot,"myform.pdf"));
                    // edit finished
                }

                string localFilePath = Path.Combine(pdfroot, "myform.pdf");
                string fileName = Path.GetFileName(localFilePath);
                //long fileSize = (new FileInfo(localFilePath)).Length;

                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new StreamContent(new FileStream(localFilePath, FileMode.Open, FileAccess.Read));
                response.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                response.Content.Headers.ContentDisposition.FileName = fileName;
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

                return response;
            }
            return null;
        }        
    }
}
