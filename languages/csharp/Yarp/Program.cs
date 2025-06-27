using Yarp.ReverseProxy;

var builder = WebApplication.CreateBuilder(args);

// Load routes and clusters from config
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();
app.MapReverseProxy();

app.Run();
