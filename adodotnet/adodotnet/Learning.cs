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
            string ConnectionString = "server= x.x.x.x; user id=docent1;password=xx;port=3306;database=docent1;SslMode=none;";
            connection.ConnectionString = ConnectionString;
            Console.WriteLine("Connectie gemaakt.");
            using (connection)
            {
                MySqlCommand command = new MySqlCommand();
                string sqlStatement = "select Name, Id from EventCategory;";
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
                    Console.WriteLine("No rows found.");
                }
                reader.Close();
            }
            Console.ReadKey();
        }




    }
}
