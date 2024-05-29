using ImageGallery.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ImageGallery.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController(ImageGalleryContext imageGalleryContext) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await imageGalleryContext.Images.ToListAsync();

            return Ok(result);
        }
    }
}
