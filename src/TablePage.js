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
      <caption>Shelly's Daughters</caption>
        <tbody>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Birthday</th>
          </tr>
          <tr>
            <th scope="row">Jackie</th>
            <td>5</td>
            <td>April 5</td>
          </tr>
          <tr>
            <th scope="row">Beth</th>
            <td>8</td>
            <td>January 14</td>
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
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Birthday</th>
          </tr>
          <tr>
            <td>Jackie</td>
            <td>5</td>
            <td>April 5</td>
          </tr>
          <tr>
            <td>Beth</td>
            <td>8</td>
            <td>January 14</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TablePage;