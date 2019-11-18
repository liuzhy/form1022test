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

        [HttpGet]
        [Route("api/test/{id}/{doctype?}/{page?}")]
        public bool GetTest(string id,string doctype="html",int page=3)
        {
            var pdffile = Path.Combine(AppContext.BaseDirectory, string.Format("{0}.pdf",id));
            var pdf = new PdfParser(pdffile);
            var newpdfpath = Path.Combine(AppContext.BaseDirectory,"1022-3.pdf");
            if(pdf.PageToNewPdf(1,newpdfpath))
            {
                var formpdf = new PdfParser(newpdfpath);
                formpdf.SetFieldValue(
                    "ap.marital mar",
                    "no",//DateTime.Now.Millisecond.ToString(),
                    Path.Combine(AppContext.BaseDirectory,"Form-1022-3.pdf")
                    );
            }
            return true;
        }

        [HttpGet]
        [Route("api/downloadform/{id}")]
        public HttpResponseMessage GetFile(string id)
        {
            string localFilePath = Path.Combine(AppContext.BaseDirectory, string.Format("{0}.pdf",id));
            string fileName = Path.GetFileName(localFilePath);
            long fileSize = (new FileInfo(localFilePath)).Length;

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StreamContent(new FileStream(localFilePath, FileMode.Open, FileAccess.Read));
            response.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = fileName;
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            return response;
        }        
    }
}
