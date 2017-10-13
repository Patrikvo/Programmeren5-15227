using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;

namespace AdoDotNet.Dal
{
    class EventCategory : Dal.IDal<Bll.EventCategory>
    {
        private string connectionString;
        private string message;

        public string Message
        {
            get { return message; }
            set { message = value; }
        }

        public EventCategory()
        {
            // Lees de connectiestring in
            // later gebruiken hiervoor dependancy injection
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");
            IConfiguration configuration = builder.Build();
            connectionString = string.Format("server={0};user id={1};password={2};port={3};database={4};SslMode={5};",
                configuration["connection:server"],
                configuration["connection:userid"],
                configuration["connection:password"],
                configuration["connection:port"],
                configuration["connection:database"],
                configuration["connection:SslMode"]);
        }

    }
}
