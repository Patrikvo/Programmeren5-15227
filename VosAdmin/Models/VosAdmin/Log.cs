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
        public string UserName { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        [Required]
        [StringLength(50)]
        public string Role { get; set; }
        [Required]
        [StringLength(25)]
        public string ProcedureCode { get; set; }
        [Required]
        [StringLength(255)]
        public string ProcedureTitle { get; set; }
        [Required]
        [StringLength(255)]
        public string StepTitle { get; set; }
        [Required]
        [StringLength(10)]
        public string ActionCode { get; set; }
        [Required]
        [StringLength(25)]
        public string CallNumber { get; set; }
        [Required]
        [StringLength(25)]
        public string SendNumber { get; set; }
        [Column(TypeName = "int(11)")]
        public int Id { get; set; }
    }
}
