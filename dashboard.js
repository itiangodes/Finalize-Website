// Load orders
fetch('get_orders.php')
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById('orderTableBody');
    data.forEach((order, index) => {
      tbody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${order.customer_name}</td>
          <td>${order.items_ordered}</td>
          <td>${order.notes || 'None'}</td>
          <td>${order.status}</td>
          <td>
            <button class="btn btn-success btn-sm" onclick="updateStatus(${order.id}, 'completed')">✔️</button>
          </td>
        </tr>`;
    });
  });

// Load menu
fetch('get_menu.php')
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById('menuTableBody');
    data.forEach(item => {
      tbody.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>${item.size}</td>
          <td>₱${item.price}</td>
          <td>
            <button class="btn btn-warning btn-sm">✏️ Edit</button>
            <button class="btn btn-danger btn-sm">🗑️ Delete</button>
          </td>
        </tr>`;
    });
  });

function updateStatus(orderId, status) {
  fetch(`update_status.php?id=${orderId}&status=${status}`)
    .then(() => location.reload());
}
