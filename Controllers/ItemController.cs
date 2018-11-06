namespace todo.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Routing;
    using Models;


    [Produces("application/json")]
    [Route("api/[controller]")] 
    public class ItemController : Controller
    {
        private readonly IDocumentDBRepository<todo.Models.Item> Respository;
        public ItemController(IDocumentDBRepository<todo.Models.Item> Respository)
        {
            this.Respository = Respository;
        }
 
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var items = await Respository.GetItemsAsync(d => !d.Completed);
            if(items == null){
                return NotFound();
            }
            return Ok(items);
        }
        

#pragma warning disable 1998 
        [HttpPost]
        public async Task<IActionResult> CreateAsync()
        {
            return View();
        }
#pragma warning restore 1998

        [HttpPost] 
        public async Task<ActionResult> CreateAsync([Bind("Id,Title,Description,Note,Completed")] [FromBody] Item item)
        {
            if (ModelState.IsValid)
            {
                await Respository.CreateItemAsync(item);
                return RedirectToAction("Index");
            }

            return Ok(item);
        }

        [HttpPut] 
        public async Task<ActionResult> EditAsync([Bind("Id,Title,Description,Note,Completed")] [FromBody] Item item)
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

            Item item = await Respository.GetItemAsync(id);
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

            Item item = await Respository.GetItemAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        } 

        [HttpGet("{id}")]
        public async Task<ActionResult> DetailsAsync(string id)
        {
            Item item = await Respository.GetItemAsync(id);
            return Ok(item);
        }
    }
}