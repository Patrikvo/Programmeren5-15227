using System;
using System.Collections.Generic;
using System.Text;

namespace AdoDotNet.Bll
{
    public class EventTopic
    {
        // fields
        protected String name;
        protected Int32 id;
        // Getters and setters
        public String Name
        {
            get { return this.name; }
            set { this.name = value; }
        }

        public Int32 Id
        {
            get { return this.id; }
            set { this.id = value; }
        }

    }
}
