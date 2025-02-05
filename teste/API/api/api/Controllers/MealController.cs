using API.Controllers.Entities;
using API.Controllers.Entities.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/meal")]
    [ApiController]
    public class MealController : ControllerBase
    {
            private readonly DataContext _context;
            public MealController(DataContext context)
            {
                _context = context;
            }


            [HttpGet("listar-meal")]
            public async Task<IActionResult> GetAllMeal()
            {
                var meals = await _context.Meal.ToListAsync();
                var formattedMeals = meals.Select(meal => new
                {
                    Id = meal.Id, // Mantendo o ID original
                    CategoryIds = meal.CategoryIds
                        .Split(new[] { "; ", ";" }, StringSplitOptions.RemoveEmptyEntries)
                        .Select(id => long.TryParse(id, out var num) ? num : 0) // Convertendo para long e tratando erro
                        .Where(id => id != 0) // Removendo valores inválidos
                        .ToList(),
                    Title = meal.Title,
                    Affordability = meal.Affordability,
                    Complexity = meal.Complexity,
                    ImageUrl = meal.ImageUrl,
                    Duration = meal.Duration,
                    Ingredients = meal.Ingredients
                        .Split(new[] { "; ", ";" }, StringSplitOptions.RemoveEmptyEntries)
                        .ToList(),
                                Steps = meal.Steps
                        .Split(new[] { "; ", ";" }, StringSplitOptions.RemoveEmptyEntries)
                        .ToList(),
                    IsGlutenFree = meal.IsGlutenFree,
                    IsVegan = meal.IsVegan,
                    IsVegetarian = meal.IsVegetarian,
                    IsLactoseFree = meal.IsLactoseFree
                });

            return Ok(formattedMeals);
        }

            [HttpPost]
            public async Task<ActionResult<List<Meal>>> AddMeal([FromBody] Meal meal)
            {
                _context.Meal.Add(meal);
                await _context.SaveChangesAsync();
                return Ok(await GetAllMeal());
            }

            [HttpPut]
            public async Task<ActionResult<List<Meal>>> UpdateMeal(Meal updatedMeal)
            {
                var dbCat = await _context.Meal.FindAsync(updatedMeal.Id);
                if (dbCat is null)
                    return NotFound("Meal Not Found");
                dbCat.Title = updatedMeal.Title;
                dbCat.ImageUrl = updatedMeal.ImageUrl;
                dbCat.CategoryIds = updatedMeal.CategoryIds;
                dbCat.Ingredients = updatedMeal.Ingredients;
                dbCat.Steps = updatedMeal.Steps;
                dbCat.Duration = updatedMeal.Duration;
                dbCat.Complexity = updatedMeal.Complexity;
                dbCat.Affordability = updatedMeal.Affordability;
                dbCat.IsGlutenFree = updatedMeal.IsGlutenFree;
                dbCat.IsVegan = updatedMeal.IsVegan;
                dbCat.IsVegetarian = updatedMeal.IsVegetarian;
                dbCat.IsLactoseFree = updatedMeal.IsLactoseFree;

                await _context.SaveChangesAsync();


                return Ok(await _context.Meal.ToListAsync());
            }
            [HttpDelete]
            public async Task<ActionResult<List<Meal>>> DeleteMeal(long Id)
            {
                var dbMeal = await _context.Meal.FindAsync(Id);
                if (dbMeal is null)
                    return NotFound("Meal Not Found");


                _context.Meal.Remove(dbMeal);
                await _context.SaveChangesAsync();


                return Ok(await _context.Meal.ToListAsync());
            }
    }
}