using ImageGallery.BLL.Interfaces;
using ImageGallery.BLL.Models;
using Microsoft.AspNetCore.Mvc;

namespace ImageGallery.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController(IImageService imageService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await imageService.Get();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] FileModel model)
        {
            await imageService.Add(model);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await imageService.Delete(id);

            return Ok();
        }
    }
}
