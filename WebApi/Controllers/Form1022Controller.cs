using System;
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
        [Route("api/form/{formid}/info")]
        public List<Dictionary<string,object>> GetAllForminfo(string formid)
        {
            var pdffile = Path.Combine(pdfroot,formid+".pdf");
            if(System.IO.File.Exists(pdffile))
            {
                var pdfDoc = new PdfParser(pdffile);
                return pdfDoc.GetFieldsInfo();
            }
            else
                return null;
        }

        [HttpGet]
        [Route("api/form/{formid}/{pageid}/{forcegenerate?}")]
        public List<Dictionary<string,object>> GetPage(string formid,int pageid,bool forcegenerate=false)
        {
            if(!forcegenerate)
            {
                var db = new DbHelper();
                var ret = db.LoadFormData(formid,pageid);
                if(ret==null)
                    ret = db.LoadFormConfig(formid,pageid);
                if(ret!=null)
                    return ret;
            }

            var pdffile = Path.Combine(pdfroot,formid+".pdf");
            var pdfDoc = new PdfParser(pdffile);
            if(pageid>pdfDoc.GetPageNumber() || pageid<1)
                return null;
            var newpdf = Path.Combine(pdfroot,string.Format("{0}.{1}.pdf",formid,pageid));
            if(pdfDoc.PageToNewPdf(pageid,newpdf))
            {
                var result =new PdfParser(newpdf).GetFieldsInfo();
                var db = new DbHelper();
                db.SavePdfFormData(formid,pageid,result);
                return result;
            }
            else
                return null;            
        }

        [HttpPost]
        [Route("api/form/{formid}/{pageid}")]
        public bool PostPageForm(string formid,int pageid,Dictionary<string,string> formdata)
        {
            var db = new DbHelper();
            return db.SaveFormData(formid,pageid,formdata);
        }

        [HttpGet]
        [Route("api/download/myform/{formid}.{pageid}.pdf")]
        public ActionResult<Stream> GetFile(string formid,int pageid)
        {
            //var configfile = Path.Combine(pdfroot,string.Format("{0}.{1}.json",formid,pageid));
            var db = new DbHelper();
            var jsonObj = db.LoadFormData(formid,pageid);
            if(jsonObj.Count>0)
            {

                var pdffile = Path.Combine(pdfroot,formid+".pdf");
                var pdfDoc = new PdfParser(pdffile);
                if(pageid>pdfDoc.GetPageNumber() || pageid<1)
                    return null;
                var newpdf = Path.Combine(pdfroot,string.Format("{0}.{1}.pdf",formid,pageid));
                var downpdfname = string.Format("myform.{0}.{1}.pdf",formid,pageid);
                if(pdfDoc.PageToNewPdf(pageid,newpdf))
                {
                    var pdfDocForm = new PdfParser(newpdf);
                    if(pdfDocForm.GetFieldsInfo().Count<1)
                        return null;
                    // edit post content
                    pdfDocForm.SetFieldsValues(jsonObj,Path.Combine(pdfroot,downpdfname));
                    // edit finished
                }

                string localFilePath = Path.Combine(pdfroot, downpdfname);
                string fileName = Path.GetFileName(localFilePath);
                //long fileSize = (new FileInfo(localFilePath)).Length;
                var dataBytes = System.IO.File.ReadAllBytes(localFilePath);  
                var dataStream = new MemoryStream(dataBytes);  
                return dataStream;

                // HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                // response.Content = new StreamContent(dataStream);
                // response.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                // response.Content.Headers.ContentDisposition.FileName = fileName;
                // response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

                //return response;
            }
            else
                return null;
        }        
    }

}
