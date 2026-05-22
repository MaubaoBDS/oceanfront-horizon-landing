import {
  Calendar,
  Filter,
  Loader2,
  LogOut,
  Phone,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { LEAD_STATUS, type LeadStatus } from "@/lib/constants";

const STATUS_KEYS: LeadStatus[] = [
  "new",
  "in_progress",
  "contacted",
  "closed",
  "not_interested",
];

export default function AdminLeads() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <Loader2 className="w-8 h-8 animate-spin text-gold-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AuthGate
        title="Đăng nhập để truy cập CRM"
        description="Khu vực này chỉ dành cho quản trị viên MSH Group."
      >
        <a
          href={getLoginUrl()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm btn-gold text-sm"
        >
          <Shield className="w-4 h-4" />
          Đăng nhập với Manus
        </a>
      </AuthGate>
    );
  }

  if (user?.role !== "admin") {
    return (
      <AuthGate
        title="Bạn không có quyền truy cập"
        description={`Tài khoản ${user?.email ?? "này"} không có quyền quản trị. Vui lòng liên hệ quản trị viên để được cấp quyền.`}
        icon={ShieldAlert}
      >
        <button
          onClick={() => logout()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-navy-900 hover:bg-navy-800 text-white text-sm transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Đăng xuất
        </button>
        <Link
          href="/"
          className="text-sm text-navy-600 hover:text-gold-700 transition-colors"
        >
          Về trang chủ
        </Link>
      </AuthGate>
    );
  }

  return <LeadsTable onLogout={() => logout()} />;
}

function AuthGate({
  title,
  description,
  children,
  icon: Icon = Shield,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  icon?: typeof Shield;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4">
      <div className="max-w-md w-full bg-white rounded-sm border border-navy-100 shadow-lg p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gold-50 flex items-center justify-center">
          <Icon className="w-8 h-8 text-gold-700" />
        </div>
        <h1 className="heading-serif text-2xl text-navy-900 mb-2">{title}</h1>
        <p className="text-navy-600 text-sm mb-6">{description}</p>
        <div className="flex flex-col gap-3 items-center">{children}</div>
      </div>
    </div>
  );
}

function LeadsTable({ onLogout }: { onLogout: () => void }) {
  const utils = trpc.useUtils();
  const { data: leads = [], isLoading, refetch, isRefetching } = trpc.contact.getLeads.useQuery();
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editNote, setEditNote] = useState("");

  const updateStatus = trpc.contact.updateLeadStatus.useMutation({
    onSuccess: () => {
      utils.contact.getLeads.invalidate();
      toast.success("Cập nhật thành công");
      setEditingId(null);
    },
    onError: (err) => toast.error(err.message),
  });

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          l.name.toLowerCase().includes(q) ||
          l.phone.includes(q) ||
          (l.note ?? "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [leads, statusFilter, search]);

  const stats = useMemo(() => {
    const counts: Record<string, number> = { all: leads.length };
    for (const k of STATUS_KEYS) counts[k] = 0;
    for (const l of leads) counts[l.status] = (counts[l.status] || 0) + 1;
    return counts;
  }, [leads]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-navy-100 sticky top-0 z-30">
        <div className="container py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-serif font-bold text-navy-900"
            >
              OH
            </Link>
            <div>
              <h1 className="heading-serif text-xl text-navy-900 leading-tight">CRM Leads</h1>
              <p className="text-xs text-navy-500">OceanFront Horizon · MSH Group</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => refetch()}
              disabled={isRefetching}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-sm border border-navy-200 hover:border-gold-400 text-sm text-navy-700 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isRefetching ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Tải lại</span>
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-sm bg-navy-900 hover:bg-navy-800 text-white text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container py-6 md:py-8">
        {/* Status filter pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          <FilterPill
            label="Tất cả"
            count={stats.all}
            active={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
          />
          {STATUS_KEYS.map((s) => (
            <FilterPill
              key={s}
              label={LEAD_STATUS[s].label}
              count={stats[s] || 0}
              active={statusFilter === s}
              onClick={() => setStatusFilter(s)}
              colorClass={LEAD_STATUS[s].color}
            />
          ))}
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="text"
              placeholder="Tìm theo tên, số điện thoại hoặc ghi chú..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-navy-200 rounded-sm focus:outline-none focus:border-gold-500 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-navy-600">
            <Filter className="w-4 h-4" />
            <span>
              Hiển thị <strong>{filtered.length}</strong> / {leads.length} lead
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-sm border border-navy-100 overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="py-20 text-center text-navy-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
              Đang tải dữ liệu...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-navy-500">
              <p className="text-base">Không có lead nào phù hợp.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-navy-50 text-navy-700">
                  <tr>
                    <Th>#</Th>
                    <Th>Khách hàng</Th>
                    <Th>SĐT</Th>
                    <Th>Quan tâm</Th>
                    <Th>Ngân sách</Th>
                    <Th>Nguồn</Th>
                    <Th>Trạng thái</Th>
                    <Th>Thời gian</Th>
                    <Th>Hành động</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100">
                  {filtered.map((lead) => {
                    const status = LEAD_STATUS[lead.status as LeadStatus];
                    const isEditing = editingId === lead.id;
                    return (
                      <tr key={lead.id} className="hover:bg-cream/50">
                        <Td>#{lead.id}</Td>
                        <Td>
                          <div className="font-medium text-navy-900">{lead.name}</div>
                          {lead.note && (
                            <div className="text-xs text-navy-500 mt-0.5 line-clamp-2 max-w-xs">
                              {lead.note}
                            </div>
                          )}
                        </Td>
                        <Td>
                          <a
                            href={`tel:${lead.phone}`}
                            className="text-navy-700 hover:text-gold-700 inline-flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {lead.phone}
                          </a>
                        </Td>
                        <Td>{labelInterest(lead.interest)}</Td>
                        <Td>{labelBudget(lead.budget)}</Td>
                        <Td>
                          <span className="text-xs text-navy-500">
                            {lead.source || "website"}
                          </span>
                        </Td>
                        <Td>
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              updateStatus.mutate({
                                id: lead.id,
                                status: e.target.value as LeadStatus,
                                adminNote: lead.adminNote,
                              })
                            }
                            className={`text-xs px-2 py-1 rounded-sm border-0 font-medium ${status.color}`}
                          >
                            {STATUS_KEYS.map((s) => (
                              <option key={s} value={s}>
                                {LEAD_STATUS[s].label}
                              </option>
                            ))}
                          </select>
                          {isEditing && (
                            <div className="mt-2">
                              <textarea
                                value={editNote}
                                onChange={(e) => setEditNote(e.target.value)}
                                rows={2}
                                className="w-full text-xs px-2 py-1.5 border border-navy-200 rounded-sm focus:outline-none focus:border-gold-500"
                                placeholder="Ghi chú admin..."
                              />
                              <div className="flex gap-1 mt-1">
                                <button
                                  onClick={() =>
                                    updateStatus.mutate({
                                      id: lead.id,
                                      status: lead.status as LeadStatus,
                                      adminNote: editNote,
                                    })
                                  }
                                  className="text-xs px-2 py-1 bg-gold-500 text-navy-900 rounded-sm hover:bg-gold-400"
                                >
                                  Lưu
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="text-xs px-2 py-1 bg-navy-100 text-navy-700 rounded-sm hover:bg-navy-200"
                                >
                                  Hủy
                                </button>
                              </div>
                            </div>
                          )}
                          {lead.adminNote && !isEditing && (
                            <div className="text-[11px] text-navy-500 mt-1 italic line-clamp-2 max-w-[180px]">
                              {lead.adminNote}
                            </div>
                          )}
                        </Td>
                        <Td>
                          <div className="text-xs text-navy-500 inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(lead.createdAt).toLocaleString("vi-VN", {
                              timeZone: "Asia/Ho_Chi_Minh",
                              day: "2-digit",
                              month: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </Td>
                        <Td>
                          <button
                            onClick={() => {
                              setEditingId(isEditing ? null : lead.id);
                              setEditNote(lead.adminNote ?? "");
                            }}
                            className="text-xs text-gold-700 hover:text-gold-800 underline"
                          >
                            {isEditing ? "Đóng" : "Ghi chú"}
                          </button>
                        </Td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
  colorClass,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  colorClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-colors ${
        active
          ? "bg-navy-900 border-navy-900 text-white"
          : `bg-white border-navy-200 text-navy-700 hover:border-gold-400 ${colorClass ?? ""}`
      }`}
    >
      {label}
      <span
        className={`text-[11px] px-1.5 py-0.5 rounded-full font-semibold ${
          active ? "bg-gold-500 text-navy-900" : "bg-navy-100 text-navy-700"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 align-top">{children}</td>;
}

function labelInterest(v: string | null | undefined) {
  const map: Record<string, string> = {
    "bang-gia": "Bảng giá",
    "tham-quan": "Tham quan",
    "dau-tu": "Đầu tư",
    "uu-dai": "Ưu đãi",
    khac: "Khác",
  };
  return v ? (map[v] ?? v) : "—";
}

function labelBudget(v: string | null | undefined) {
  const map: Record<string, string> = {
    "duoi-2-ty": "< 2 tỷ",
    "2-3-ty": "2 - 3 tỷ",
    "3-4-ty": "3 - 4 tỷ",
    "4-5-ty": "4 - 5 tỷ",
    "tren-5-ty": "> 5 tỷ",
  };
  return v ? (map[v] ?? v) : "—";
}
