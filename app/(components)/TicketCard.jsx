import StatusDisplay from "./StatusDisplay";
import PriorityDisplay from "./PriorityDisplay";
import DeleteBlock from "./DeleteBlock";
import ProgressDisplay from "./ProgressDisplay";
import Link from "next/link";

const TicketCard = ({ ticket }) => {
  function formatTimestamp(timestamp) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  }

  const createdDateTime = formatTimestamp(ticket.createdAt);

  return (
    <div className="flex flex-col hover:bg-gray-800 bg-dark-card text-white rounded-md shadow-xl transition-all p-4 m-3">
      <div className="flex mb-4 items-center">
        <PriorityDisplay priority={ticket.priority} />
        <div className="ml-auto">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>

      <Link href={`/TicketPage/${ticket._id}`} className="text-decoration-none">
        <h4 className="text-xl font-semibold mb-2">{ticket.title}</h4>
        <hr className="h-px border-0 bg-gray-700 mb-3" />
        <p className="whitespace-pre-wrap text-sm text-gray-300">{ticket.description}</p>

        <div className="flex-grow"></div>

        <div className="flex mt-4">
          <div className="flex flex-col">
            <p className="text-xs text-gray-400 my-2">{createdDateTime}</p>
            <ProgressDisplay progress={ticket.progress} />
          </div>
          <div className="ml-auto flex items-end">
            <StatusDisplay status={ticket.status} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
