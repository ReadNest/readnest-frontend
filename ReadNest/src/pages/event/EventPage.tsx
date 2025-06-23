import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPagedEventsStart,
  updateEventStart,
  deleteEventStart,
  createEventStart, // 👈 ADD
  setPagingInfo,
} from "@/features/event/eventSlice";
import type { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { DataTableWithPagination } from "@/components/ui/DataTableWithPagination";
import type { UpdateEventRequest } from "@/api/@types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EventPage() {
  const dispatch = useDispatch();
  const eventState = useSelector((state: RootState) => state.event);
  const { pageIndex, pageSize } = eventState.pagingInfo;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // 👈 NEW
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [editType, setEditType] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const handlePageChange = useCallback(
    (pageIndex: number) => {
      dispatch(fetchPagedEventsStart({ pageIndex, pageSize: pageSize ?? 10 }));
    },
    [dispatch, pageSize]
  );

  useEffect(() => {
    dispatch(fetchPagedEventsStart({ pageIndex: pageIndex ?? 1, pageSize: pageSize ?? 10 }));
  }, [dispatch, pageIndex, pageSize]);

  const openEditModal = (event: any) => {
    setSelectedEvent(event);
    setEditName(event.name ?? "");
    setEditDescription(event.description ?? "");
    setEditStartDate(event.startDate?.substring(0, 10) ?? "");
    setEditEndDate(event.endDate?.substring(0, 10) ?? "");
    setEditType(event.type ?? "");
    setEditStatus(event.status ?? "");
    setIsCreating(false); // 👈 Editing
    setEditModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedEvent(null);
    setEditName("");
    setEditDescription("");
    setEditStartDate("");
    setEditEndDate("");
    setEditType("");
    setEditStatus("");
    setIsCreating(true); // 👈 Creating
    setEditModalOpen(true);
  };

  const handleSubmit = () => {
    // Convert to Date objects and then ISO strings
    const start = new Date(editStartDate);
    const end = new Date(editEndDate);
  
    const payload: UpdateEventRequest = {
      id: selectedEvent?.id,
      name: editName.trim(),
      description: editDescription.trim(),
      startDate: start.toISOString(), 
      endDate: end.toISOString(),  
      type: editType,
      status: editStatus,
    };
  
    if (isCreating) {
      dispatch(createEventStart(payload));
    } else {
      dispatch(updateEventStart(payload));
    }
  
    setEditModalOpen(false);
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Events</h1>
        </div>

        <DataTableWithPagination
          pagedData={eventState.events}
          columns={[
            { key: "name", label: "Name", isBold: true },
            { key: "description", label: "Description" },
            {
              key: "startDate",
              label: "Start Date",
              format: (value) =>
                value ? new Date(value).toLocaleDateString() : "-",
            },
            {
              key: "endDate",
              label: "End Date",
              format: (value) =>
                value ? new Date(value).toLocaleDateString() : "-",
            },
            { key: "type", label: "Type" },
            { key: "status", label: "Status" },
          ]}
          onEdit={openEditModal}
          onDelete={(event) => dispatch(deleteEventStart(event.id ?? ""))}
          onAdd={openCreateModal} // 👈 use modal
          enableEdit={true}
          enableDelete={true}
          enableAdd={true}
          pagingInfo={eventState.pagingInfo}
          onPageSizeChange={(newPageSize) => {
            dispatch(
              setPagingInfo({
                ...eventState.pagingInfo,
                pageSize: newPageSize ?? 10,
              })
            );
            dispatch(
              fetchPagedEventsStart({
                pageIndex: pageIndex ?? 1,
                pageSize: newPageSize ?? 10,
              })
            );
          }}
          onPageChange={handlePageChange}
        />
      </CardContent>

      {/* Modal for Add/Edit */}
      <Dialog
        open={editModalOpen}
        onOpenChange={(open) => {
          setEditModalOpen(open);
          if (!open) setIsCreating(false); // reset
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isCreating ? "Create New Event" : "Edit Event"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Event Name"
            />
            <Textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Event Description"
            />
            <Input
              type="date"
              value={editStartDate}
              onChange={(e) => setEditStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <Input
              type="date"
              value={editEndDate}
              onChange={(e) => setEditEndDate(e.target.value)}
              placeholder="End Date"
            />
            <Select value={editType} onValueChange={setEditType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Yearly">Yearly</SelectItem>
                <SelectItem value="Festival">Festival</SelectItem>
              </SelectContent>
            </Select>
            <Select value={editStatus} onValueChange={setEditStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Ended">Ended</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSubmit}>
                {isCreating ? "Create" : "Update"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
