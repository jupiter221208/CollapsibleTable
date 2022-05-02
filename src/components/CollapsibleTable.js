import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

// images
import UserAvatarIcon from "../assets/1.jpg";

// json data
import GroupedFindings from "../assets/grouped_findings.json";
import RowFindings from "../assets/row_findings.json";

const Row = (props) => {
  const { groupRow } = props;
  const [open, setOpen] = React.useState(false);
  const filterRow = RowFindings.filter(
    (row) => row.grouped_finding_id === groupRow.id
  );

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <Box sx={{ width: "100%" }}>
            {groupRow.severity === "low" ? (
              <Chip
                sx={{ width: "100%" }}
                label={groupRow.severity}
                color="warning"
              />
            ) : groupRow.severity === "medium" ? (
              <Chip
                sx={{ width: "100%" }}
                label={groupRow.severity}
                color="success"
              />
            ) : (
              <Chip
                sx={{ width: "100%" }}
                label={groupRow.severity}
                color="primary"
              />
            )}
          </Box>
        </TableCell>
        <TableCell>{groupRow.grouped_finding_created}</TableCell>
        <TableCell>{groupRow.sla}</TableCell>
        <TableCell>{groupRow.description}</TableCell>
        <TableCell align="center">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Avatar alt="Remy Sharp" src={UserAvatarIcon} />
            <Typography>{groupRow.security_analyst}</Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Avatar alt="Remy Sharp" src={UserAvatarIcon} />
            <Typography>{groupRow.owner}</Typography>
          </Stack>
        </TableCell>
        <TableCell>{groupRow.workflow}</TableCell>
        <TableCell align="center">
          {groupRow.status === "in_progress" ? (
            <Chip label="IN PROGRESS" color="primary" />
          ) : groupRow.status === "start" ? (
            <Chip label={groupRow.status} color="warning" />
          ) : (
            <Chip label={groupRow.status} color="success" />
          )}
          <Box sx={{ width: "100%", marginTop: "5px" }}>
            <LinearProgress
              variant="determinate"
              color="warning"
              value={groupRow.progress * 100}
            />
          </Box>
        </TableCell>

        <TableCell>
          <Chip label={filterRow.length} color="primary" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Raw Findings
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>SERVERITY</TableCell>
                    <TableCell>TIME</TableCell>
                    <TableCell>SOURCE</TableCell>
                    <TableCell>DESCRIPTION</TableCell>
                    <TableCell>ASSET</TableCell>
                    <TableCell>STATUS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterRow.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="center">
                        {row.severity === "low" ? (
                          <Chip label={row.severity} color="warning" />
                        ) : row.severity === "medium" ? (
                          <Chip label={row.severity} color="success" />
                        ) : (
                          <Chip label={row.severity} color="primary" />
                        )}
                      </TableCell>
                      <TableCell>{row.finding_created}</TableCell>
                      <TableCell>{row.source_security_tool_name}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.asset}</TableCell>
                      <TableCell align="center">
                        {row.status === "open" ? (
                          <Chip label="OPEN" color="primary" />
                        ) : row.status === "start" ? (
                          <Chip label={row.status} color="warning" />
                        ) : (
                          <Chip label={row.status} color="success" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
const CollapsibleTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>SEVERITY</TableCell>
            <TableCell>TIME</TableCell>
            <TableCell>SLA</TableCell>
            <TableCell>DESCRIPTION</TableCell>
            <TableCell>SECURITY ANALYST</TableCell>
            <TableCell>OWNER</TableCell>
            <TableCell>WORKFLOW</TableCell>
            <TableCell>STATUS</TableCell>
            <TableCell align="center">
              #OF
              <br />
              FINDINGS
            </TableCell>
            <TableCell>COMMUNICATIONS</TableCell>
            <TableCell>ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {GroupedFindings.map((row) => (
            <Row key={row.id} groupRow={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
