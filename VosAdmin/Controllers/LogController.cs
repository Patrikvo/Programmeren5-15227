using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VosAdmin.Models.VosAdmin;
// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VosAdmin.Controllers
{
   // [Route("api/[controller]")]
    public class LogController : Controller
    {

        [Route("api/List")]
        public IEnumerable<Log> List(string username)
        {
            return dbContext.Log.ToList();
        }

        [HttpPost]
        [Route("api/Insert")]
        public int Insert([FromBody]Models.VosAdmin.Log log)
        {
            dbContext.Log.Add(log);
            int cnt = dbContext.SaveChanges();
            return cnt;
        }





        private readonly User7Context dbContext;

        public LogController(User7Context dbContext)
        {
            this.dbContext = dbContext;
        }


        // GET: /<controller>/
        [Route("Log/Index")]
        public IActionResult Index()
        {
            ViewBag.Title = "Vos Logboek Index";
            return View(dbContext.Log.ToList());
        }

        public IActionResult InsertingOne()
        {
            ViewBag.Title = "Vos Logboek Inserting One";
            return View(dbContext.Log.ToList());
        }

        [HttpGet("{id}")]
        [Route("Log/ReadingOne/{id}")]
        public IActionResult ReadingOne(int? id)
        {
            ViewBag.Title = "Vos Logboek Reading One";
            if (id == null)
            {
                return NotFound();
            }

            var log = dbContext.Log.SingleOrDefault(m => m.Id == id);
            if (log == null)
            {
                return NotFound();
            }
            return View(log);
        }

     //   [HttpGet]
        public IActionResult UpdatingOne(int? id)
        {
            ViewBag.Title = "Vos Logboek Updating One";

            if (id == null)
            {
                return NotFound();
            }

            var log = dbContext.Log.SingleOrDefault(m => m.Id == id);
            if (log == null)
            {
                return NotFound();
            }
            return View(log);
        }

        [Route("Log/Cancel")]
        public IActionResult Cancel()
        {
            return Redirect("Index");
            //return RedirectToAction("Index");
        }



        // CRUD methods

        [HttpPost]
        public IActionResult InsertOne(Models.VosAdmin.Log log)
        {
            ViewBag.Message = "Insert een log in de database";
            dbContext.Log.Add(log);
            dbContext.SaveChanges();
            return View("Index", dbContext.Log);
        }


        [HttpPost]
        public IActionResult UpdateOne(Models.VosAdmin.Log log)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    dbContext.Update(log);
                    dbContext.SaveChanges();
                    return View("ReadingOne", log);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!dbContext.Log.Any(e => e.Id == log.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return View("Index", log);
        }


        // GET: Supplier/Delete/5
        [Route("Log/DeleteOne/{id}")]
        public IActionResult DeleteOne(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            // zoek het land dat verwijderd moet worden
            var log = dbContext.Log.SingleOrDefault(m => m.Id == id);
            if (log == null)
            {
                return NotFound();
            }
            dbContext.Log.Remove(log);
            dbContext.SaveChanges();
            // keer terug naar de index pagina
            return RedirectToAction("Index");

         
        }



    }
}
