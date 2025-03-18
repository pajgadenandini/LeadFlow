import { useState } from "react";
import { 
  Button, Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, MenuItem, IconButton, Grid 
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";

interface FilterLeadsProps {
  onApplyFilters: (filters: any) => void;
  onResetFilters: () => void;
}

export default function FilterLeads({ onApplyFilters, onResetFilters }: FilterLeadsProps) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    clientName: "",
    clientEmail: "",
    status: "",
    createdFrom: "",
    createdTo: "",
    lastActivityFrom: "",
    lastActivityTo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    setOpen(false);
  };

  const handleReset = () => {
    setFilters({
      clientName: "",
      clientEmail: "",
      status: "",
      createdFrom: "",
      createdTo: "",
      lastActivityFrom: "",
      lastActivityTo: "",
    });
    onResetFilters();
  };

  return (
    <>
      <IconButton 
        onClick={() => setOpen(true)}
        sx={{
          transition: "transform 0.3s ease-in-out",
          '&:hover': { transform: "scale(1.2)" }
        }}
      >
        <FilterListIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          Filter Leads
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ 
              position: "absolute", right: 8, top: 8,
              transition: "transform 0.3s ease-in-out",
              '&:hover': { transform: "rotate(90deg)" }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {/* <TextField label="Client Name" name="clientName" value={filters.clientName} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="Client Email" name="clientEmail" value={filters.clientEmail} onChange={handleChange} fullWidth margin="dense" />
           */}
          {/* Created From - Created To in a row */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="Created From" type="date" name="createdFrom" value={filters.createdFrom} onChange={handleChange} fullWidth margin="dense" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Created To" type="date" name="createdTo" value={filters.createdTo} onChange={handleChange} fullWidth margin="dense" InputLabelProps={{ shrink: true }} />
            </Grid>
          </Grid>

          {/* Last Activity From - Last Activity To in a row */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="Last Activity From" type="date" name="lastActivityFrom" value={filters.lastActivityFrom} onChange={handleChange} fullWidth margin="dense" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Last Activity To" type="date" name="lastActivityTo" value={filters.lastActivityTo} onChange={handleChange} fullWidth margin="dense" InputLabelProps={{ shrink: true }} />
            </Grid>
          </Grid>

          {/* <TextField select label="Status" name="status" value={filters.status} onChange={handleChange} fullWidth margin="dense">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="engaging">Engaging</MenuItem>
            <MenuItem value="proposal">Proposal</MenuItem>
            <MenuItem value="closed win">Closed Win</MenuItem>
            <MenuItem value="closed missed">Closed Missed</MenuItem>
          </TextField> */}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleReset} 
            color="secondary"
            sx={{
              transition: "transform 0.3s ease-in-out",
              '&:hover': { transform: "scale(1.1)" }
            }}
          >
            Reset
          </Button>
          <Button 
            onClick={handleApply} 
            variant="contained"
            sx={{
              transition: "transform 0.3s ease-in-out",
              '&:hover': { transform: "scale(1.1)" }
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}