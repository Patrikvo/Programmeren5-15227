using System;
using System.Collections;

namespace LearnCsharp
{
    class FirstLesson
    {
        public static void CountTo(int to)
        {
            int number = 1;

            while(number <= to)
            {
                Console.WriteLine(number);
                number = number + 1;
            }
        }
        
        public static void ShowSongWriters()
        {
            ArrayList list = new ArrayList();
            list.Add("Bob Dylan");
            list.Add("Boudewijn De Groot");
            list.Add("Eric Clapton");
            
            foreach(string name in list)
                Console.WriteLine(name);

        }
    }
}