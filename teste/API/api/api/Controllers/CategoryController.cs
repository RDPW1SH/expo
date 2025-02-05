using API.Controllers.Entities;
using API.Controllers.Entities.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly DataContext _context;
            public CategoryController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("listar-categorias")]


        public async Task<IActionResult> GetAllCategory()
        {
            var categories = await _context.Category.ToListAsync();
            return Ok(categories);
        }

        [HttpPost]
        public async Task<ActionResult<List<Category>>> AddCategory([FromBody]Category category)
        {
            _context.Category.Add(category);
            await _context.SaveChangesAsync();
            return Ok(await GetAllCategory());
        }

        [HttpPut]
        public async Task<ActionResult<List<Category>>> UpdateCategory(Category updatedCategory)
        {
            var dbCat = await _context.Category.FindAsync(updatedCategory.Id);
            if (dbCat is null)
                return NotFound("Category Not Found");
            dbCat.Title = updatedCategory.Title;
            dbCat.Color = updatedCategory.Color;

            await _context.SaveChangesAsync();


            return Ok(await _context.Category.ToListAsync());
        }
        [HttpDelete]
        public async Task<ActionResult<List<Category>>> DeleteCategory(long Id)
        {
            var dbCat = await _context.Category.FindAsync(Id);
            if (dbCat is null)
                return NotFound("Category Not Found");


            _context.Category.Remove(dbCat);
            await _context.SaveChangesAsync();


            return Ok(await _context.Category.ToListAsync());
        }
    }
}
