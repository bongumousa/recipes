namespace recipes.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Routing;
    using Models;


    [Produces("application/json")]
    [Route("api/[controller]")]
    public class RecipesController : Controller
    {
        private readonly IDocumentDBRepository<recipes.Models.Recipe> Respository;

        public RecipesController(IDocumentDBRepository<recipes.Models.Recipe> Respository)
        {
            this.Respository = Respository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var items = await Respository.GetItemsAsync(d => !d.Completed);
            if (items == null)
            {
                return NotFound();
            }
            return Ok(items);
        }
 
#pragma warning restore 1998

        [HttpPost]
        public async Task<ActionResult> CreateAsync([Bind("Id,Title,Description,Note,Completed")] [FromBody] Recipe item)
        {
            if (ModelState.IsValid)
            {
                Microsoft.Azure.Documents.Document added = await Respository.CreateItemAsync(item);
                Ok(added);
             //return RedirectToAction("Index");
            }

            return Ok(item);
        }

        [HttpPut]
        public async Task<ActionResult> EditAsync([Bind("Id,Title,Description,Note,Completed")] [FromBody] Recipe item)
        {
            if (ModelState.IsValid)
            {
                await Respository.UpdateItemAsync(item.Id, item);
            }

            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditAsync([FromRoute] string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            Recipe item = await Respository.GetItemAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync([FromRoute] string id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            await Respository.DeleteItemAsync(id);

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> DetailsAsync(string id)
        {
            Recipe item = await Respository.GetItemAsync(id);
            return Ok(item);
        }
    }
}