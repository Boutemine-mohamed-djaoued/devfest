import { IoPersonSharp } from "react-icons/io5";

interface clientType {
  id: string;
  name: string;
  CIR: string;
  MIR: string;
  state: "over" | "high" | "low";
}

interface ClientCardPropos {
  client: clientType;
}

const ClientCard = ({ client }: ClientCardPropos) => {
  return (
    <div className="ring-1 ring-gray-200 rounded-xl bg-white px-4 py-2 my-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <IoPersonSharp />
          {client.name}
        </div>
        <div>ID: {client.id}</div>
      </div>
      <div className="flex text-[0.8em] mt-2 justify-between items-end">
        <div>
          <div><span className="font-semibold">CIR:</span> <span className="text-gray-500">{client.CIR}</span></div>
          <div><span className="font-semibold">MIR:</span> <span className="text-gray-500">{client.MIR}</span></div>
        </div>
        <div className={`rounded-full px-2 py-[3px] ${client.state == "over" ? "bg-red-200" : client.state == "high" ? "bg-yellow-100" : "bg-green-200" }`}>{client.state} demand</div>
      </div>
    </div>
  );
};

const ClientList = () => {
  const clients: clientType[] = [
    { id: "1", name: "Client A", CIR: "100Mbps", MIR: "80Mbps", state: "high" },
    { id: "2", name: "Client B", CIR: "50Mbps", MIR: "30Mbps", state: "low" },
    { id: "3", name: "Client C", CIR: "200Mbps", MIR: "150Mbps", state: "over" },
    { id: "4", name: "Client D", CIR: "75Mbps", MIR: "50Mbps", state: "high" },
    { id: "5", name: "Client E", CIR: "30Mbps", MIR: "20Mbps", state: "low" },
    { id: "6", name: "Client F", CIR: "120Mbps", MIR: "90Mbps", state: "high" },
    { id: "7", name: "Client G", CIR: "180Mbps", MIR: "160Mbps", state: "over" },
    { id: "8", name: "Client H", CIR: "40Mbps", MIR: "25Mbps", state: "low" },
    { id: "9", name: "Client I", CIR: "90Mbps", MIR: "70Mbps", state: "high" },
    { id: "10", name: "Client J", CIR: "60Mbps", MIR: "45Mbps", state: "low" },
  ];
  return (
    <div className="w-[15rem]">
      <input className="w-full ring-1 py-1 mb-3 px-3 bg-white ring-gray-200 rounded-md " type="text" placeholder="Search Client by ID ..." />
      <div>
        {clients.map((client: clientType) => {
          return <ClientCard key={client.id} client={client} />;
        })}
      </div>
    </div>
  );
};
export default ClientList;
