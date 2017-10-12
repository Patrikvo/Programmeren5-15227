using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace AdoDotNet
{
    class ConfigurationInDotNetCore
    {
        public static void LearnDotNetCoreConfigurationApi()
        {
            Console.WriteLine("Leren werken met de .NET Core configuratie API"); var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");
            IConfiguration configuration = builder.Build();
            string connectionString = string.Format("server={0};user id={1};password={2};port={3};database={4};SslMode={5};",
                configuration["connection:server"],
                configuration["connection:userid"],
                configuration["connection:password"],
                configuration["connection:port"],
                configuration["connection:database"],
                configuration["connection:SslMode"]);
            Console.WriteLine(connectionString);
        }
    }
}
