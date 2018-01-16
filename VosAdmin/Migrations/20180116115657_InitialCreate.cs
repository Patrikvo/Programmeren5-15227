using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace VosAdmin.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Log",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ActionCode = table.Column<string>(maxLength: 10, nullable: false),
                    CallNumber = table.Column<string>(maxLength: 25, nullable: false),
                    Email = table.Column<string>(maxLength: 255, nullable: false),
                    ProcedureCode = table.Column<string>(maxLength: 25, nullable: false),
                    ProcedureTitle = table.Column<string>(maxLength: 255, nullable: false),
                    Role = table.Column<string>(maxLength: 50, nullable: false),
                    SendNumber = table.Column<string>(maxLength: 25, nullable: false),
                    StepTitle = table.Column<string>(maxLength: 255, nullable: false),
                    UserName = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Log", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Log");
        }
    }
}
