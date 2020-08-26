using System;
using System.IO;
using DxfLib;
using IxMilia.Dxf;
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
                var fileName = Path.GetFileName(upload.FileName);

                using (var ms = new MemoryStream())
                {
                    upload.CopyTo(ms);
                    ms.Seek(0, SeekOrigin.Begin);

                    try
                    {
                        var dxfFile = DxfFile.Load(ms);
                        var fileJson = new DxfToJsonConverter().EncodeFileJson(dxfFile);
                        return fileJson;
                    }
                    catch (Exception e)
                    {
                        return $"{{\"error\":\"{e.Message}\"}}";
                    }
                }
            }

            return "{\"error\":\"No File Uploaded\"}";
        }
    }
}