import React from "react";
import { Check, CheckCheck } from "lucide-react";
import { formatFullDate, formatMessageTime } from "../lib/time";

const MessageStatus = ({ status, isOwn, createdAt }) => {
  if (!isOwn) return null;
  
  const getStatusIcon = () => {
    switch(status) {
      case 'sent':
        return <Check className="w-3 h-3 text-slate-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-slate-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      default:
        return <Check className="w-3 h-3 text-slate-500" />;
    }
  };
  
  const getStatusTitle = () => {
    switch(status) {
      case 'sent': return 'Sent';
      case 'delivered': return 'Delivered';
      case 'read': return 'Seen';
      default: return '';
    }
  };

  // Format tooltip text
  const getTooltip = () => {
    if (!createdAt) return getStatusTitle();
    return `${getStatusTitle()} - ${formatFullDate(createdAt)} at ${formatMessageTime(createdAt)}`;
  };
  
  return (
    <div 
      className="flex items-center gap-1 ml-1" 
      title={getTooltip()}
    >
      {getStatusIcon()}
    </div>
  );
};

export default MessageStatus;