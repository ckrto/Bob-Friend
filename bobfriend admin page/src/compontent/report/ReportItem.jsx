import React from 'react'

const ReportItem = ({report}) => {
    const {r_code,suer,defender,r_result,r_type} =report

  return (
    <tr style={{textAlign:"center"}}>
        <td>{r_code}</td>
        <td>{suer}</td>
        <td>{defender}</td>
        <td>{r_result}</td>
        <td>{r_type}</td>
    </tr>
  )
}

export default ReportItem