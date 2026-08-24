"use client";

import React, { useState } from "react";
import { Info, X, Building2, User, Hash, MapPin, Landmark } from "lucide-react";
import { BankDetails } from "@/lib/types";

export const BankDetailsPopover = ({ bankDetails }: { bankDetails: BankDetails }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-white rounded-md transition-colors"
        title="View Bank Details"
      >
        <Info className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Landmark className="w-5 h-5 text-blue-500" />
                Bank Account Details
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800/50 space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-zinc-500" />
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Account Name</div>
                    <div className="text-sm font-medium text-white">{bankDetails.accountName}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-zinc-500" />
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Bank & Branch</div>
                    <div className="text-sm font-medium text-white">{bankDetails.bankName} - {bankDetails.branch}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-zinc-500" />
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">District</div>
                    <div className="text-sm font-medium text-white">{bankDetails.district}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Hash className="w-4 h-4 text-zinc-500" />
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Account & Routing</div>
                    <div className="text-sm font-mono text-white">Acct: ••••{bankDetails.accountNumber?.slice(-4) || '????'}</div>
                    <div className="text-sm font-mono text-zinc-400">Rout: ••••{bankDetails.routingNumber?.slice(-4) || '????'}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-zinc-800 bg-zinc-950/50 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
