using System;
using System.Collections.Generic;
using System.Text;

namespace AdoDotNet.Dal
{
    interface IDal<T>
    {
        string Message { get; }
        int RowCount { get; }
        List<T> ReadAll();
        T ReadOne(int id);

        int Create(T bll);
        int Update(T bll);
        int Delete(int id);
    }
}
