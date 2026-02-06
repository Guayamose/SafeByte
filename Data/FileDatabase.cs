using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using SafeByte.Models;

namespace SafeByte.Data
{
    public static class FileDatabase
    {
        private static string GetFilePath()
        {
            // Combina la ruta absoluta de Data/Seed con "Users.json"
            var basePath = Directory.GetCurrentDirectory();
            var filePath = Path.Combine(basePath, "Data", "Seed", "Users.json");
            Console.WriteLine("Ruta del archivo: " + filePath);
            return filePath;
        }

        public static List<User> LoadUsers()
        {
            try
            {
                string filePath = GetFilePath();
                if (!File.Exists(filePath))
                {
                    Console.WriteLine("El archivo Users.json no existe. Se retorna una lista vacía.");
                    return new List<User>();
                }

                string json = File.ReadAllText(filePath);
                var users = JsonSerializer.Deserialize<List<User>>(json);
                Console.WriteLine("Usuarios cargados: " + (users?.Count ?? 0));
                return users ?? new List<User>();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al cargar usuarios: " + ex.Message);
                return new List<User>();
            }
        }

        public static void SaveUsers(List<User> users)
        {
            try
            {
                string filePath = GetFilePath();
                string json = JsonSerializer.Serialize(users, new JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(filePath, json);
                Console.WriteLine("Usuarios guardados correctamente. Total usuarios: " + users.Count);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al guardar usuarios: " + ex.Message);
            }
        }
    }
}
