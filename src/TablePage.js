import React from 'react';

const TablePage = () => {
  return (
    <div>

    <h1>
      This is a example page comparing two tables to understand whether they read different to assistive technology users.
    </h1>

    <h2>
      Table 1
    </h2>
    <table>
      <caption>Intake Requests</caption>
        <tbody>
          <tr>
            <th scope="col">Submission date</th>
            <th scope="col">Request Name</th>
            <th scope="col">Component</th>
            <th scope="col">Type of request</th>
            <th scope="col">Status</th>
          </tr>
          <tr>
            <th scope="row">March 25, 2020</th>
            <td>The Best System</td>
            <td>OIT</td>
            <td>Decommission a system</td>
            <td>Intake request received</td>
          </tr>
          <tr>
            <th scope="row">August 25, 2020</th>
            <td>The New System</td>
            <td>OIT</td>
            <td>Major changes or updates</td>
            <td>Ready for GRB meeting</td>
          </tr>
      </tbody>
    </table>

    <h2>
      Table 2
    </h2>
    <table>
      <caption>Shelly's Daughters</caption>
        <tbody>
        <tr>
            <th scope="col">Submission date</th>
            <th scope="col">Request Name</th>
            <th scope="col">Component</th>
            <th scope="col">Type of request</th>
            <th scope="col">Status</th>
          </tr>
          <tr>
            <td>March 25, 2020</td>
            <td>The Best System</td>
            <td>OIT</td>
            <td>Decommission a system</td>
            <td>Intake request received</td>
          </tr>
          <tr>
            <td>August 25, 2020</td>
            <td>The New System</td>
            <td>OIT</td>
            <td>Major changes or updates</td>
            <td>Ready for GRB meeting</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TablePage;