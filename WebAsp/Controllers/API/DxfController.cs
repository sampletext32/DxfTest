using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DxfLib;
using IxMilia.Dxf;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAsp.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class DxfController : ControllerBase
    {
        [HttpPost]
        public string Upload()
        {
            var upload = Request.Form.Files["file"];
            if (upload != null)
            {
                // получаем имя файла
                string fileName = Path.GetFileName(upload.FileName);

                using (MemoryStream ms = new MemoryStream())
                {
                    upload.CopyTo(ms);
                    ms.Seek(0, SeekOrigin.Begin);

                    var dxfFile = DxfFile.Load(ms);
                    var fileJson = new DxfToJsonConverter().EncodeFileJson(dxfFile);
                    return fileJson;
                }
            }

            return "THERE IS A FUCKING ERROR";
        }
    }
}