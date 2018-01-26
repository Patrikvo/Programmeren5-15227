using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VosAdmin.Models.VosAdmin
{
    public partial class Log
    {
        [Required]
        [StringLength(50)]
        [FromForm(Name = "Log-UserName")]
        public string UserName { get; set; }

        [Required]
        [StringLength(255)]
        [FromForm(Name = "Log-Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(50)]
        [FromForm(Name = "Log-Role")]
        public string Role { get; set; }

        [Required]
        [StringLength(25)]
        [FromForm(Name = "Log-ProcedureCode")]
        public string ProcedureCode { get; set; }

        [Required]
        [StringLength(255)]
        [FromForm(Name = "Log-ProcedureTitle")]
        public string ProcedureTitle { get; set; }

        [Required]
        [StringLength(255)]
        [FromForm(Name = "Log-StepTitle")]
        public string StepTitle { get; set; }

        [Required]
        [StringLength(10)]
        [FromForm(Name = "Log-ActionCode")]
        public string ActionCode { get; set; }

        [Required]
        [StringLength(25)]
        [FromForm(Name = "Log-CallNumber")]
        public string CallNumber { get; set; }

        [Required]
        [StringLength(25)]
        [FromForm(Name = "Log-SendNumber")]
        public string SendNumber { get; set; }

        [Column(TypeName = "int(11)")]
        [FromForm(Name = "Log-Id")]
        public int Id { get; set; }
    }
}
