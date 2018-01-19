using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VosAdmin.Controllers
{
    public class LogController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            ViewBag.Title = "Vos Logboek Index";
            return View();
        }

        public IActionResult InsertingOne()
        {
            ViewBag.Title = "Vos Logboek Inserting One";
            return View();
        }

        public IActionResult ReadingOne()
        {
            ViewBag.Title = "Vos Logboek Reading One";
            return View();
        }

        public IActionResult UpdatingOne()
        {
            ViewBag.Title = "Vos Logboek Updating One";
            return View();
        }
    }
}
