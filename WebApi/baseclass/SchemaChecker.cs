using System;
using System.Text;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace FormParser.DataSchema
{
    public class SchemaChecker
    {
        public SchemaChecker(List<DataSchemaItem> schemaitems)
        {
            // Init SchemaChecker Class here
        }
        public void Check(string strJsonObject)
        {
            var jobj = JsonConvert.DeserializeObject<JsonToken>(strJsonObject);
        }
    }

    public class DataSchemaItem
    {
        public string SchemaName {get;set;}
        public string SchemaType {get;set;}

        public string CheckRegx {get;set;}
    }
}