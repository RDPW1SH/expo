using System.Text.Json;
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
                    Id = meal.Id,
                    CategoryIds = string.IsNullOrEmpty(meal.CategoryIds)
                        ? new List<long>()
                        : JsonSerializer.Deserialize<List<long>>(meal.CategoryIds),
                    Title = meal.Title,
                    Affordability = meal.Affordability,
                    Complexity = meal.Complexity,
                    ImageUrl = meal.ImageUrl,
                    Duration = meal.Duration,
                    Ingredients = string.IsNullOrEmpty(meal.Ingredients)
                        ? new List<string>()
                        : JsonSerializer.Deserialize<List<string>>(meal.Ingredients),
                    Steps = string.IsNullOrEmpty(meal.Steps)
                        ? new List<string>()
                        : JsonSerializer.Deserialize<List<string>>(meal.Steps),
                    IsGlutenFree = meal.IsGlutenFree,
                    IsVegan = meal.IsVegan,
                    IsVegetarian = meal.IsVegetarian,
                    IsLactoseFree = meal.IsLactoseFree
                });

                return Ok(formattedMeals);
            }

            [HttpPost("add-meal")]
            public async Task<ActionResult<List<Meal>>> AddMeal([FromForm] AddMeal newMeal)
            {
                var meal = new Meal
                {
                    Title = newMeal.Title,
                    ImageUrl = newMeal.ImageUrl,
                    CategoryIds = JsonSerializer.Serialize(newMeal.CategoryIds), 
                    Ingredients = JsonSerializer.Serialize(newMeal.Ingredients), 
                    Steps = JsonSerializer.Serialize(newMeal.Steps), 
                    Duration = newMeal.Duration,
                    Complexity = newMeal.Complexity,
                    Affordability = newMeal.Affordability,
                    IsGlutenFree = newMeal.IsGlutenFree,
                    IsVegan = newMeal.IsVegan,
                    IsVegetarian = newMeal.IsVegetarian,
                    IsLactoseFree = newMeal.IsLactoseFree
                };

                _context.Meal.Add(meal);
                await _context.SaveChangesAsync();
                return Ok(await GetAllMeal());
            }

            [HttpPut("edit-meal")]
            public async Task<ActionResult<List<Meal>>> UpdateMeal([FromForm] AddMeal updatedMeal)
            {
                var dbMeal = await _context.Meal.FindAsync(updatedMeal.Id);
                if (dbMeal is null)
                    return NotFound("Meal Not Found");

                dbMeal.Title = updatedMeal.Title;
                dbMeal.ImageUrl = updatedMeal.ImageUrl;

                // Serializando listas para armazenar da db
                dbMeal.CategoryIds = JsonSerializer.Serialize(updatedMeal.CategoryIds);
                dbMeal.Ingredients = JsonSerializer.Serialize(updatedMeal.Ingredients);
                dbMeal.Steps = JsonSerializer.Serialize(updatedMeal.Steps);

                dbMeal.Duration = updatedMeal.Duration;
                dbMeal.Complexity = updatedMeal.Complexity;
                dbMeal.Affordability = updatedMeal.Affordability;
                dbMeal.IsGlutenFree = updatedMeal.IsGlutenFree;
                dbMeal.IsVegan = updatedMeal.IsVegan;
                dbMeal.IsVegetarian = updatedMeal.IsVegetarian;
                dbMeal.IsLactoseFree = updatedMeal.IsLactoseFree;

                await _context.SaveChangesAsync();

                return Ok(await _context.Meal.ToListAsync());
            }

            [HttpDelete("delete-meal")]
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