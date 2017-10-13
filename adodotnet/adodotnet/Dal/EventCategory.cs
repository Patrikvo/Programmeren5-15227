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

        private int rowCount;

        public int RowCount
        {
            get { return rowCount; }
            set { rowCount = value; }
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

        public List<Bll.EventCategory> ReadAll()
        {
            List<Bll.EventCategory> list = new List<Bll.EventCategory>();
            MySqlConnection connection = new MySqlConnection(this.connectionString);
            // in de CommandText parameter geven we de naam van de stored procedure mee
            MySqlCommand command = new MySqlCommand("EventCategorySelectAll", connection);
            // zeg aan het command object dat het een stored procedure
            // zal krijgen en geen SQL Statement
            command.CommandType = CommandType.StoredProcedure;
            Message = "Niets te melden";
            // we gaan ervan uit dat het mislukt
            MySqlDataReader result = null;
            RowCount = 0;
            using (connection)
            {
                try
                {
                    connection.Open();
                    //Verbinding geslaagd
                    Message = "Connectie is open";

                    using (result = command.ExecuteReader())
                    {
                        if (result.HasRows)
                        {
                            int counter = 0;
                            // lees de gevonden rij in
                            while (result.Read())
                            {
                                counter++;
                                Bll.EventCategory bll = new Bll.EventCategory();
                                bll.Name = (result.IsDBNull(result.GetOrdinal("Name")) ? "" : result["Name"].ToString());
                                bll.Id = (result.IsDBNull(result.GetOrdinal("Id")) ? 0 : Int32.Parse(result["Id"].ToString()));
                                list.Add(bll);
                            }
                            this.message = "EventCategory rijen gevonden.";
                            RowCount = counter;
                        }
                        else
                        {
                            this.message = "Geen EventCategory rijen gevonden.";
                        }
                    }
                }
                catch (MySqlException e)
                {
                    this.message = e.Message;
                }
            }
            return list;
        }



        public Bll.EventCategory ReadOne(int Id)
        {
            MySqlConnection connection = new MySqlConnection(this.connectionString);
            // in de CommandText parameter geven we de naam van de stored procedure mee
            MySqlCommand command = new MySqlCommand("EventCategorySelectOne", connection);
            // zeg aan het command object dat het een stored procedure
            // zal krijgen en geen SQL Statement
            command.CommandType = CommandType.StoredProcedure;
            MySqlParameter pId = new MySqlParameter();
            pId.ParameterName = "pId";
            pId.DbType = DbType.Int32;
            pId.Value = Id;
            command.Parameters.Add(pId);
            Message = "Niets te melden";
            // we gaan ervan uit dat het mislukt
            MySqlDataReader result = null;
            RowCount = 0;
            Bll.EventCategory bll = new Bll.EventCategory();
            using (connection)
            {
                try
                {
                    connection.Open();
                    //Verbinding geslaagd
                    this.message = "Connectie is open";
                    using (result = command.ExecuteReader())
                    {
                        if (result.HasRows)
                        {
                            // lees de gevonden rij in
                            result.Read();
                            Message = $"EventCategory met Id {Id} is gevonden. De naam van de categorie is {result["Name"]}";
                            bll.Name = (result.IsDBNull(result.GetOrdinal("Name")) ? "" : result["Name"].ToString());
                            bll.Id = (result.IsDBNull(result.GetOrdinal("Id")) ? 0 : Int32.Parse(result["Id"].ToString()));
                            RowCount = 1;
                        }
                        else
                        {
                            Message = $"EventCategory met Id {Id} is niet gevonden.";
                        }
                    }
                }
                catch (MySqlException e)
                {
                    Message = e.Message;
                }
            }
            return bll;
        }




    }
}
