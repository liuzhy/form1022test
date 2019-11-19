using System;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

using System.IO;

namespace Form1022WebApi
{
    // A storage class, use one json file store form information and form field value
    public class DbHelper
    {
        string dbroot = AppContext.BaseDirectory;
        public DbHelper()
        {

        }

        // Save form field information of pdf page in to json file
        public bool SavePdfFormData(string fileid,int pageindex,List<Dictionary<string,object>> pdfform)
        {
            var configfile = Path.Combine(dbroot,string.Format("{0}.{1}.json",fileid,pageindex));
            var jsonstring = Newtonsoft.Json.JsonConvert.SerializeObject(pdfform);
            var sw = new StreamWriter(configfile);
            sw.Write(jsonstring);
            sw.Close();
            return true;
        }

        // Save posted data to json file
        public bool SaveFormData(string fileid,int pageindex,Dictionary<string,string> formdata)
        {
            var configfile = Path.Combine(dbroot,string.Format("{0}.{1}.json",fileid,pageindex));
            if(System.IO.File.Exists(configfile)){
                var sr = new StreamReader(configfile);
                var result = sr.ReadToEnd();
                sr.Close();
                var jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Dictionary<string,string>>>(result);
                foreach(var s in jsonObj)
                {
                    var key = s["key"];
                    if(formdata.Keys.Contains(key)){
                        var v1 = formdata[key];
                        s["value"] = v1==null?"":v1;
                    };
                }
                var sw = new StreamWriter(configfile);
                sw.Write(Newtonsoft.Json.JsonConvert.SerializeObject(jsonObj));
                sw.Close();
                return true;
            }
            else
                return false;            
        }

        // load form information and data from json file
        public List<Dictionary<string,object>> LoadFormData(string fileid,int pageid)
        {
            var configfile = Path.Combine(dbroot,string.Format("{0}.{1}.json",fileid,pageid));
            if(System.IO.File.Exists(configfile)){
                var sr = new StreamReader(configfile);
                var result = sr.ReadToEnd();
                sr.Close();
                var jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Dictionary<string,object>>>(result);
                return jsonObj;
            }
            return null;
        }
    }
}