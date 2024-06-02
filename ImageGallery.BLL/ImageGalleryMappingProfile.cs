using AutoMapper;
using ImageGallery.BLL.Models;
using ImageGallery.DAL.Entities;

namespace ImageGallery.BLL
{
    public class ImageGalleryMappingProfile : Profile
    {
        public ImageGalleryMappingProfile()
        {
            CreateMap<ImageModel, Image>()
                .ForMember(dest => dest.FileName, opt => opt.MapFrom(src => src.File.FileName))
                .ForMember(dest => dest.Extension, opt => opt.MapFrom(src => Path.GetExtension(src.File.FileName)));
        }
    }
}
