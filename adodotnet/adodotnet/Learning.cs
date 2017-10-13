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
            AdoDotNet.Bll.EventCategory bll = dal.ReadOne(5);
            Console.WriteLine($" {dal.RowCount} {dal.Message}");
            // we proberen deze gevonden categorie weer toe te voegen
            dal.Create(bll);
            Console.WriteLine($" {dal.RowCount} {dal.Message}");
            // we wijzigen de naam van de categorie
            bll.Name = "Hackathon Programmeren";
            // En proberen die toe te voegen
            dal.Create(bll);
            Console.WriteLine($" {dal.RowCount} {dal.Message}");


            Console.WriteLine();
            dal.ReadOne(bll.Id);
            Console.WriteLine($" {dal.RowCount} {dal.Message}");
            // we wijzigen de naam van de categorie met Id = 6
            bll.Name = "Hackathon Programmeren Deel 2";
            // En proberen die te updaten
            dal.Update(bll);
            Console.WriteLine($" {dal.RowCount} rij(en) gewijzigd, {dal.Message}");

            dal.Delete(bll.Id);
            Console.WriteLine($" {dal.RowCount} rij(en) gedeleted, {dal.Message}");

        }


        public static void EventTopicDalTest()
        {
            // Door de Update en Delete uit te voeren op een in deze test aangemaakte rij, blijft de tabel ongewijzigd.

            Console.WriteLine("EvenTopic DAL test");


            Console.WriteLine("EvenTopic DAL ReadAll");
            // Lees alle rijen van de EventTopic tabel.

            AdoDotNet.Dal.EventTopic dal = new AdoDotNet.Dal.EventTopic();
            List<AdoDotNet.Bll.EventTopic> list = dal.ReadAll();
            Console.WriteLine($"{dal.RowCount} {dal.Message}");
            foreach (AdoDotNet.Bll.EventTopic item in list)
                Console.WriteLine("{0} {1}", item.Id, item.Name);


            Console.WriteLine();


            Console.WriteLine("EvenTopic DAL ReadOne");
            //Lees één specifieke rij uit de tabel.
    
            dal.ReadOne(4);
            Console.WriteLine($"{dal.RowCount} {dal.Message}");
            dal.ReadOne(200);
            Console.WriteLine($"{dal.RowCount} {dal.Message}");


            Console.WriteLine();


            Console.WriteLine("EvenTopic DAL Create");
            // maak een nieuwe rij aan. deze wordt door de volgende tests herbruikt. Dit voorkomt dat de tabel telkens opnieuw aangemaakt moet worden.

            AdoDotNet.Bll.EventTopic bll = dal.ReadOne(5);
            Console.WriteLine($" {dal.RowCount} {dal.Message}");
            // we proberen deze gevonden topic weer toe te voegen
            dal.Create(bll);
            Console.WriteLine($" {dal.RowCount} {dal.Message}");
            // we wijzigen de naam van de topic
            bll.Name = "Ongespecifierd";
            // En proberen die toe te voegen
            int newID = dal.Create(bll);
            Console.WriteLine($" {dal.RowCount} {dal.Message}");


            Console.WriteLine();


            Console.WriteLine("EvenTopic DAL Update ");
            // de eerder aangemaakte rij wijzigen.

            bll = dal.ReadOne(newID);
            Console.WriteLine($" {dal.RowCount} {dal.Message}");
            // we wijzigen de naam van de eerder toegevoegde topic
            bll.Name = "computer games";
            // En proberen die te updaten
            dal.Update(bll);
            Console.WriteLine($" {dal.RowCount} rij(en) gewijzigd, {dal.Message}");


            Console.WriteLine();


            Console.WriteLine("EvenTopic DAL Delete");
            // de eerder toegevoegde (en gewijzigde) rij wissen.

            dal.Delete(bll.Id);
            Console.WriteLine($" {dal.RowCount} rij(en) gedeleted, {dal.Message}");

        }

    }
}
