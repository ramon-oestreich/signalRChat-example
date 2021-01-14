using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub: Hub 
    {
        public async Task sendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage",user,message);
        }
    }
}