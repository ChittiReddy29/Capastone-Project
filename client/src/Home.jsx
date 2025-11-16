
import {
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

export default function Home() {
  const { isLogged } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const [search, setSearch] = useState(""); // NEW: Search input

  const [createIncident, setCreateIncident] = useState({
    description: "",
    impact: "",
    urgency: "",
  });

  const filteredIncidents = incidents.filter((inc) => {
    const term = search.toLowerCase();
    return (
      inc.number?.toLowerCase().includes(term) ||
      inc.short_description?.toLowerCase().includes(term)
    );
  });

  const handleDelete = async (sys_id) => {
    if (window.confirm("Are you sure you want to delete this incident?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/incidents/${sys_id}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          fetchData();
        } else {
          throw new Error("Delete failed.");
        }
      } catch (error) {
        alert("Failed to delete incident.");
      }
    }
  };

  const handleCreateOpen = () => setCreateDialogOpen(true);
  const handleCreateClose = () => {
    setCreateDialogOpen(false);
    setCreateIncident({ description: "", impact: "", urgency: "" });
  };

  const handleCreateInput = (e) => {
    const { name, value } = e.target;
    setCreateIncident((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async () => {
    if (!createIncident.description || !createIncident.impact || !createIncident.urgency) {
      alert("All fields are required.");
      return;
    }

    try {
      const payload = {
        short_description: createIncident.description,
        impact: createIncident.impact,
        urgency: createIncident.urgency,
      };

      const res = await axios.post("http://localhost:3001/api/incidents", payload, {
        withCredentials: true,
      });

      if (res.data?.result) {
        handleCreateClose();
        setTimeout(fetchData, 500);
      }
    } catch (err) {
      alert("Failed to create incident.");
    }
  };

  const handleEditClick = (incident) => {
    setSelectedIncident({
      sys_id: incident.sys_id,
      short_description: incident.short_description,
      state: incident.state,
      priority: incident.priority,
    });
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedIncident(null);
  };

  const handleEditSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/incidents/${selectedIncident.sys_id}`,
        {
          short_description: selectedIncident.short_description,
          state: selectedIncident.state,
          priority: selectedIncident.priority,
        },
        { withCredentials: true }
      );

      if (res.data.result) {
        handleEditClose();
        fetchData();
      }
    } catch {
      alert("Failed to update incident.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedIncident((prev) => ({ ...prev, [name]: value }));
  };

  async function fetchData() {
    if (isLogged) {
      const response = await axios.get("http://localhost:3001/api/incidents", {
        withCredentials: true,
      });
      setIncidents(response.data.result);
    }
  }

  useEffect(() => {
    fetchData();
  }, [isLogged]);

  return (
    <>
      {isLogged ? (
        <Stack spacing={4}>
          {/* Header + Create Button */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" fontWeight="bold">
              Incident Dashboard
            </Typography>

            <Button variant="contained" color="primary" size="large" onClick={handleCreateOpen}>
              + Create Incident
            </Button>
          </Stack>

          {/* Search Bar */}
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
            <TextField
              fullWidth
              label="Search incidents by number or description..."
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Paper>

          {/* Incidents Grid */}
          <Grid container spacing={4}>
            {filteredIncidents.length === 0 ? (
              <Typography sx={{ ml: 2 }}>No matching incidents found.</Typography>
            ) : (
              filteredIncidents.map((inc) => (
                <Grid item key={inc.sys_id}>
                  <Card
                    sx={{
                      width: 300,
                      height: 240,
                      p: 1,
                      borderRadius: 3,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      transition: "0.2s",
                      "&:hover": { transform: "scale(1.03)" },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {inc.number}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {inc.short_description}
                      </Typography>

                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <b>State:</b> {inc.state}
                      </Typography>
                      <Typography variant="body2">
                        <b>Priority:</b> {inc.priority}
                      </Typography>

                      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleEditClick(inc)}
                          size="small"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(inc.sys_id)}
                          size="small"
                        >
                          Delete
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>

          {/* Create Dialog */}
          <Dialog open={createDialogOpen} onClose={handleCreateClose} fullWidth maxWidth="sm">
            <DialogTitle>Create New Incident</DialogTitle>
            <DialogContent>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <TextField
                  name="description"
                  label="Short Description"
                  value={createIncident.description}
                  onChange={handleCreateInput}
                  multiline
                  rows={3}
                />

                <FormControl fullWidth>
                  <InputLabel>Impact</InputLabel>
                  <Select name="impact" value={createIncident.impact} onChange={handleCreateInput}>
                    <MenuItem value="1">High (1)</MenuItem>
                    <MenuItem value="2">Medium (2)</MenuItem>
                    <MenuItem value="3">Low (3)</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Urgency</InputLabel>
                  <Select name="urgency" value={createIncident.urgency} onChange={handleCreateInput}>
                    <MenuItem value="1">High (1)</MenuItem>
                    <MenuItem value="2">Medium (2)</MenuItem>
                    <MenuItem value="3">Low (3)</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCreateClose}>Cancel</Button>
              <Button variant="contained" onClick={handleCreateSubmit}>
                Create
              </Button>
            </DialogActions>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog open={editDialogOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Incident</DialogTitle>
            <DialogContent>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <TextField
                  name="short_description"
                  label="Description"
                  value={selectedIncident?.short_description || ""}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                />

                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select name="state" value={selectedIncident?.state || ""} onChange={handleInputChange}>
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="On Hold">On Hold</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select name="priority" value={selectedIncident?.priority || ""} onChange={handleInputChange}>
                    <MenuItem value="1">1 - Critical</MenuItem>
                    <MenuItem value="2">2 - High</MenuItem>
                    <MenuItem value="3">3 - Moderate</MenuItem>
                    <MenuItem value="4">4 - Low</MenuItem>
                    <MenuItem value="5">5 - Planning</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleEditClose}>Cancel</Button>
              <Button variant="contained" onClick={handleEditSave}>
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
      ) : (
        <Typography>Please log in</Typography>
      )}
    </>
  );
}
