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




        public int Create(Bll.EventCategory bll)
        {
            MySqlConnection connection = new MySqlConnection(this.connectionString);
            // in de CommandText parameter geven we de naam van de stored procedure mee
            MySqlCommand command = new MySqlCommand("EventCategoryInsert", connection);
            // zeg aan het command object dat het een stored procedure
            // zal krijgen en geen SQL Statement
            command.CommandType = CommandType.StoredProcedure;
            // voeg de parameters toe die aan de stored procedure doorgegeven moeten worden
            MySqlParameter pName = new MySqlParameter();
            pName.ParameterName = "pName";
            pName.DbType = DbType.String;
            pName.Value = bll.Name;
            command.Parameters.Add(pName);
            MySqlParameter pId = new MySqlParameter();
            pId.ParameterName = "pId";
            pId.DbType = DbType.Int32;
            // om de out parameter van de stored procedure op te vangen
            // die stuurt de Id van de nieuw toegevoegde rij terug
            pId.Direction = ParameterDirection.Output;
            command.Parameters.Add(pId);

            Message = "Niets te melden";
            // we gaan ervan uit dat het mislukt
            int result = 0;
            using (connection)
            {
                try
                {
                    connection.Open();
                    //Verbinding geslaagd
                    result = command.ExecuteNonQuery();
                    // we moeten kijken naar de waarde van out parameter
                    // van Insert stored procedure. Als de naam van de
                    // category al bestaat, retourneert de out parameter van
                    // de stored procedure
                    // -1
                    if ((int)pId.Value == -100)
                    {
                        Message = $"De categorie met de naam {bll.Name} bestaat al!";
                        result = -100;
                    }
                    else if (result <= 0)
                    {
                        Message = $"De categorie met de naam {bll.Name} kon niet worden geïnserted!";
                        this.message = "EventCategory is niet geïnserted.";
                    }
                    else
                    {
                        Message = $"De categorie met de naam {bll.Name} is geïnserted!";
                        result = (int)pId.Value;
                    }
                }
                catch (MySqlException e)
                {
                    this.message = e.Message;
                }
            }
            // 0 of de Id van de nieuwe rij of -100 als de naam van de categorie al bestaat
            return result;
        }



        public int Update(Bll.EventCategory bll)
        {
            MySqlConnection connection = new MySqlConnection(this.connectionString);
            // in de CommandText parameter geven we de naam van de stored procedure mee
            MySqlCommand command = new MySqlCommand("EventCategoryUpdate", connection);
            // zeg aan het command object dat het een stored procedure
            // zal krijgen en geen SQL Statement
            command.CommandType = CommandType.StoredProcedure;
            // voeg de parameters toe die aan de stored procedure doorgegeven moeten worden
            MySqlParameter pId = new MySqlParameter();
            pId.ParameterName = "pId";
            pId.DbType = DbType.Int32;
            // De Id van de rij die  moet worden geüpdated
            pId.Value = bll.Id;
            command.Parameters.Add(pId);
            MySqlParameter pName = new MySqlParameter();
            pName.ParameterName = "pName";
            pName.DbType = DbType.String;
            pName.Value = bll.Name;
            command.Parameters.Add(pName);

            Message = "Niets te melden";
            // we gaan ervan uit dat het mislukt
            int result = 0;
            using (connection)
            {
                try
                {
                    connection.Open();
                    //Verbinding geslaagd
                    result = command.ExecuteNonQuery();
                    // we moeten kijken naar de return van ExecuteNonQuery
                    // retourneert het aantal rijen dat geüpdated is
                    // is geüpdated als dat getal positief is
                    if (result <= 0)
                    {
                        Message = $"De categorie met de naam {bll.Name} kon niet worden geüpdated!";
                    }
                    else
                    {
                        Message = $"De categorie met de naam {bll.Name} is geüpdated!";
                    }
                }
                catch (MySqlException e)
                {
                    this.message = e.Message;
                }
                RowCount = result;
            }
            // 0 of het aantal rijen dat geüpdated is
            return result;
        }

    }
}
