using System;
using System.Collections.Generic;
using System.Text;
using MySql.Data.MySqlClient;
using System.Data;

namespace AdoDotNet
{
    class Learning
    {
        public static void TestMySqlConnector()
        {
            MySqlConnection connection = new MySql.Data.MySqlClient.MySqlConnection();
            string ConnectionString = "server= 164.132.231.13; user id=user7;password=N7EMVJ96;port=3306;database=user7;SslMode=none;";
            connection.ConnectionString = ConnectionString;
            Console.WriteLine("Connectie gemaakt.");
            using (connection)
            {
                MySqlCommand command = new MySqlCommand();
                string sqlStatement = "select Name, Id from EventTopic;";
                command.Connection = connection;
                command.CommandText = sqlStatement;
                connection.Open();
                MySqlDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection);
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Console.WriteLine("{0}\t{1}", reader["Name"],
                            reader["Id"]);
                    }
                }
                else
                {
                    Console.WriteLine("No rows found. ");
                }
                reader.Close();
            }
            Console.ReadKey();
        }

        public static void EventCategoryDalTest()
        {
            Console.WriteLine("EvenCategory DAL test");
            AdoDotNet.Dal.EventCategory dal = new AdoDotNet.Dal.EventCategory();
            List<AdoDotNet.Bll.EventCategory> list = dal.ReadAll();
            Console.WriteLine($"{dal.RowCount} {dal.Message}");
            foreach (AdoDotNet.Bll.EventCategory item in list)
                Console.WriteLine("{0} {1}", item.Id, item.Name);

            Console.WriteLine();
            

            dal.ReadOne(4);
            Console.WriteLine($"{dal.RowCount} {dal.Message}");
            dal.ReadOne(200);
            Console.WriteLine($"{dal.RowCount} {dal.Message}");

            Console.WriteLine();
            AdoDotNet.Bll.EventCategory bll = dal.ReadOne(6);
            Console.WriteLine($" {dal.RowCount} {dal.Message}");
            // we proberen deze gevonden categorie weer toe te voegen
            dal.Create(bll);
            Console.WriteLine($" {dal.RowCount} {dal.Message}");
            // we wijzigen de naam van de categorie
            bll.Name = "Hackathon Programmeren";
            // En proberen die toe te voegen
            dal.Create(bll);
            Console.WriteLine($" {dal.RowCount} {dal.Message}");
        }


    }
}
