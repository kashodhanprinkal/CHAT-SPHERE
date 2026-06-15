import React from 'react';
import { Check, CheckCheck } from 'lucide-react';

const MessageStatus = ({ status, isOwn }) => {
  // Only show status for messages sent by current user
  if (!isOwn) return null;
  
  const getStatusIcon = () => {
    switch(status) {
      case 'sent':
        return (
          <div className="flex items-center gap-0.5" title="Sent">
            <Check className="w-3 h-3 text-slate-400" />
          </div>
        );
      case 'delivered':
        return (
          <div className="flex items-center gap-0.5" title="Delivered">
            <CheckCheck className="w-3 h-3 text-slate-400" />
          </div>
        );
      case 'read':
        return (
          <div className="flex items-center gap-0.5" title="Seen">
            <CheckCheck className="w-3 h-3 text-blue-400" />
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-0.5" title="Sending...">
            <Check className="w-3 h-3 text-slate-500" />
          </div>
        );
    }
  };
  
  return (
    <div className="inline-flex items-center ml-1">
      {getStatusIcon()}
    </div>
  );
};

export default MessageStatus;