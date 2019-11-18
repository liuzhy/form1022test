using System;
using System.Text;
using System.Collections.Generic;
using Newtonsoft.Json;

using System.IO;
using iText.Kernel.Pdf;
using iText.Forms;

namespace FormParser.Pdf
{
    // This is the class for pdf parsing. Based on iText7 dotnet version
    // This class can split pdf file/get pdf form information/fill pdf form fields/
    public class PdfParser
    {
        string inputPdfFile;
        public PdfParser(string pdffile)
        {
            if(File.Exists(pdffile))
                inputPdfFile = pdffile;
            else
                throw new FileNotFoundException(
                    string.Format("{0} was not found!",pdffile)
                );
        }

        // Get PdfDocument from input file;
        public PdfDocument GetPdfDocument()
        {
            var preader = new PdfReader(inputPdfFile);
            var inputPdf = new PdfDocument(preader);
            return inputPdf;
        }

        // Pick a page from current pdf, and generate a new pdf with this page
        public bool PageToNewPdf(int pageindex,string newpdffilename)
        {
            // Get page from current pdf
            var page = this.GetPdfDocument().GetPage(pageindex);

            // Generate a new pdf with the page

            // init new pdf
            var outfile = newpdffilename;
            var writer = new PdfWriter(outfile);
            var pdfDoc = new PdfDocument(writer);

            // copy page to new pdf
            var tempPage = page.CopyTo(pdfDoc);
            pdfDoc.AddPage(tempPage);

            // important! copy forms from source page to new page
            PdfPageFormCopier cp = new PdfPageFormCopier();
            cp.Copy(page,tempPage);

            // close document to save new pdf
            var document = new iText.Layout.Document(pdfDoc);
            document.Close();
            pdfDoc.Close();
            writer.Close();

            return true;
        }

        // Set pdf form value, and save as a new pdf.
        // Important: It is only for this project. 
        // A better way is using Dictionary to modify multiple form fields
        public void SetFieldValue(string fieldkey,string fieldvalue,string newpdfname)
        {
            // Get pdf reader from current pdf
            // and init a new pdf writer
            PdfReader inputReader = new PdfReader(inputPdfFile);
            var outfile = newpdfname;
            var writer = new PdfWriter(outfile);
            var indoc = new PdfDocument(inputReader, writer);

            // Get form fields
            PdfAcroForm form = PdfAcroForm.GetAcroForm(indoc,false);
            var fields1 = form.GetFormFields();

            // Set Value by key name
            if(fields1.Keys.Contains(fieldkey))
                fields1[fieldkey].SetValue(fieldvalue,true);
            else
                throw new NullReferenceException("Wrong field key name");
            indoc.Close();
            writer.Close();
        }

        // Get fields key/type/currentvalue from current pdf and return a dict
        public Dictionary<string,object> GetFieldsByPage(int pageindex)
        {

            PdfAcroForm form = PdfAcroForm.GetAcroForm(this.GetPdfDocument(),false);
            var fields = form.GetFormFields();
            var ret = new Dictionary<string,object>();
            foreach(var fkey in fields.Keys)
            {
                var field = fields[fkey];
                if(field.GetFormType()!=null)
                {
                    ret.Add(fkey,new Dictionary<string,object>{
                        {"type",field.GetFormType().ToString()},
                        {"value",field.GetValue()==null?null:field.GetValueAsString()}
                    });
                }
            }
            return ret;
        }
    }

}