using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace VosAdmin.Models.VosAdmin
{
    public partial class User7Context : DbContext
    {
        public virtual DbSet<Log> Log { get; set; }

        public User7Context(DbContextOptions<User7Context> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

            }
        }

        
    }
}
