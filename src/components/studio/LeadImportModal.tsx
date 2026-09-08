import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Building2,
  Mail,
  User,
  Layers,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { getBridgeBaseUrl } from "../../config/bridgeConfig";

interface LeadImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: () => void;
}

interface ParsedLeadRow {
  company: string;
  recipient_name: string;
  title: string;
  email: string;
  sector: string;
  locality: string;
  country: string;
}

export default function LeadImportModal({ isOpen, onClose, onImportSuccess }: LeadImportModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [parsedRows, setParsedRows] = useState<ParsedLeadRow[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ imported: number; skipped: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const parseCSV = (text: string) => {
    try {
      const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
      if (lines.length < 2) {
        setErrorMessage("CSV file appears empty or lacks header line.");
        return;
      }

      // Parse headers
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/['"]/g, ""));

      // Column mapping heuristics
      const companyIdx = headers.findIndex((h) => h.includes("company") || h.includes("org") || h.includes("account") || h.includes("business"));
      const nameIdx = headers.findIndex((h) => h.includes("name") || h.includes("recipient") || h.includes("contact") || h.includes("person"));
      const titleIdx = headers.findIndex((h) => h.includes("title") || h.includes("role") || h.includes("position") || h.includes("designation"));
      const emailIdx = headers.findIndex((h) => h.includes("email") || h.includes("mail"));
      const sectorIdx = headers.findIndex((h) => h.includes("sector") || h.includes("industry") || h.includes("domain") || h.includes("vertical"));
      const localityIdx = headers.findIndex((h) => h.includes("locality") || h.includes("city") || h.includes("state") || h.includes("area"));
      const countryIdx = headers.findIndex((h) => h.includes("country") || h.includes("region") || h.includes("nation"));

      if (emailIdx === -1) {
        setErrorMessage("Could not identify an 'Email' column in CSV headers.");
        return;
      }

      const rows: ParsedLeadRow[] = [];
      for (let i = 1; i < lines.length; i++) {
        const rawLine = lines[i];
        // Handle basic quoted commas
        const cols: string[] = [];
        let inQuotes = false;
        let current = "";
        for (let c = 0; c < rawLine.length; c++) {
          const char = rawLine[c];
          if (char === '"') inQuotes = !inQuotes;
          else if (char === "," && !inQuotes) {
            cols.push(current.trim().replace(/^"|"$/g, ""));
            current = "";
          } else {
            current += char;
          }
        }
        cols.push(current.trim().replace(/^"|"$/g, ""));

        const email = (cols[emailIdx] || "").trim();
        if (!email || !email.includes("@")) continue;

        rows.push({
          company: companyIdx !== -1 && cols[companyIdx] ? cols[companyIdx] : "Enterprise Prospect",
          recipient_name: nameIdx !== -1 && cols[nameIdx] ? cols[nameIdx] : "Executive Directorate",
          title: titleIdx !== -1 && cols[titleIdx] ? cols[titleIdx] : "Managing Director",
          email: email,
          sector: sectorIdx !== -1 && cols[sectorIdx] ? cols[sectorIdx] : "enterprise",
          locality: localityIdx !== -1 && cols[localityIdx] ? cols[localityIdx] : "Metro Corridor",
          country: countryIdx !== -1 && cols[countryIdx] ? cols[countryIdx] : "India",
        });
      }

      setParsedRows(rows);
      setErrorMessage(null);
    } catch (err: any) {
      setErrorMessage("Error parsing CSV: " + err.message);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) parseCSV(evt.target.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) parseCSV(evt.target.result as string);
      };
      reader.readAsText(file);
    }
  };

  const executeBulkImport = async () => {
    if (parsedRows.length === 0) return;
    setIsImporting(true);
    setErrorMessage(null);

    try {
      const baseUrl = getBridgeBaseUrl();
      const res = await fetch(`${baseUrl}/api/leads/bulk-import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leads: parsedRows }),
      });

      const data = await res.json();
      if (data.success) {
        setImportResult({ imported: data.importedCount, skipped: data.skippedCount });
        onImportSuccess();
      } else {
        setErrorMessage(data.error || "Import failed");
      }
    } catch (err: any) {
      setErrorMessage("Could not connect to Antigravity Bridge: " + err.message);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-['Sora',sans-serif] animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Upload size={16} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Bulk Ingestion &amp; Lead Stager</h3>
              <p className="text-[11px] text-slate-500">
                Drag and drop CSV (Apollo, ZoomInfo, Sales Navigator, Maps)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {importResult ? (
            <div className="p-6 text-center space-y-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="text-base font-semibold text-slate-900">Ingestion Batch Complete!</h4>
              <p className="text-xs text-slate-600">
                Successfully registered <strong>{importResult.imported}</strong> new enterprise leads into SQLite, balanced across the 5 mailboxes, and scheduled for the 4-day cadence.
              </p>
              {importResult.skipped > 0 && (
                <p className="text-[11px] text-slate-500">
                  ({importResult.skipped} duplicate or invalid rows were safely skipped)
                </p>
              )}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  Return to Pipeline
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Dropzone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  dragActive
                    ? "border-emerald-500 bg-emerald-50/50"
                    : "border-slate-300 hover:border-slate-400 bg-slate-50/50"
                }`}
              >
                <input
                  type="file"
                  id="csv-file-input"
                  accept=".csv"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <label htmlFor="csv-file-input" className="cursor-pointer block space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 mx-auto flex items-center justify-center border border-slate-200">
                    <FileText size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-emerald-700 hover:underline">
                      Click to upload CSV
                    </span>
                    <span className="text-xs text-slate-500"> or drag and drop file here</span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Auto-maps: Company, Email, Name, Title, Sector, Locality, Country
                  </p>
                </label>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Parsed Preview Table */}
              {parsedRows.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">
                      Preview: {parsedRows.length} Leads Ready for Ingestion
                    </span>
                    <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                      5-Mailbox Rotation Auto-Assigned
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-100/80 sticky top-0 border-b border-slate-200 text-[10px] uppercase text-slate-500 font-semibold tracking-wider">
                        <tr>
                          <th className="p-2.5">Company</th>
                          <th className="p-2.5">Recipient</th>
                          <th className="p-2.5">Email</th>
                          <th className="p-2.5">Sector</th>
                          <th className="p-2.5">Country</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 text-[11px]">
                        {parsedRows.slice(0, 15).map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80">
                            <td className="p-2.5 font-medium text-slate-900">{row.company}</td>
                            <td className="p-2.5">{row.recipient_name}</td>
                            <td className="p-2.5 font-mono text-slate-600">{row.email}</td>
                            <td className="p-2.5">{row.sector}</td>
                            <td className="p-2.5">{row.country}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {parsedRows.length > 15 && (
                    <p className="text-[10px] text-slate-400 text-right">
                      Showing first 15 of {parsedRows.length} records
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!importResult && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={parsedRows.length === 0 || isImporting}
              onClick={executeBulkImport}
              className="px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg disabled:opacity-40 transition-colors flex items-center gap-2 shadow-xs"
            >
              {isImporting ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  <span>Committing to SQLite...</span>
                </>
              ) : (
                <>
                  <Sparkles size={13} className="text-emerald-400" />
                  <span>Import {parsedRows.length} Leads</span>
                  <ArrowRight size={13} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
