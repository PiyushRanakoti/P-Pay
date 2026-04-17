# Transaction History Feature - Complete Implementation

## Database Schema

Your existing `transactions` table is well-designed:

```sql
CREATE TABLE public.transactions (
    id bpchar(10) DEFAULT generate_unique_id('transactions'::text) NOT NULL,
    sender_id bpchar(10) NOT NULL,
    receiver_id bpchar(10),
    amount numeric(12, 2) NOT NULL CHECK (amount > 0),
    type varchar(20) NOT NULL 
        CHECK (type IN ('transfer', 'deposit')),
    created_at timestamp DEFAULT now(),
    CONSTRAINT transactions_pkey PRIMARY KEY (id),
    CONSTRAINT fk_sender 
        FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE CASCADE,
    CONSTRAINT fk_receiver 
        FOREIGN KEY (receiver_id) REFERENCES public.users(id) ON DELETE CASCADE,
    CONSTRAINT chk_receiver_required
        CHECK (
            (type = 'transfer' AND receiver_id IS NOT NULL) OR
            (type = 'deposit' AND receiver_id IS NULL)
        )
);

CREATE INDEX idx_transactions_sender ON public.transactions(sender_id);
CREATE INDEX idx_transactions_receiver ON public.transactions(receiver_id);
```

### Schema Explanation:
- **id**: Unique transaction identifier with auto-generation
- **sender_id**: User initiating the transaction (foreign key to users table)
- **receiver_id**: User receiving money (NULL for deposits, required for transfers)
- **amount**: Transaction amount with validation (>0)
- **type**: Either 'transfer' or 'deposit'
- **created_at**: Timestamp when transaction occurred
- **Constraints**: 
  - Ensures receiver is required for transfers but NULL for deposits
  - Foreign key relationships maintain referential integrity
  - Cascade delete to remove orphaned transactions
- **Indexes**: Optimizes queries for both sender and receiver lookups

---

## Backend API Implementation

### Endpoint: `GET /api/v1/account/history`

**File**: `backend/routes/account/history.js`

**Authentication**: Requires Bearer token in Authorization header

**Query Parameters**:
- `limit` (optional, default: 50) - Number of records per page
- `offset` (optional, default: 0) - Number of records to skip

**Response**:
```json
{
  "transactions": [
    {
      "id": "TXN123456",
      "amount": 500.00,
      "type": "transfer",
      "timestamp": "2024-04-17T10:30:00Z",
      "senderUsername": "john_doe",
      "receiverUsername": "jane_smith",
      "isSender": true,
      "status": "completed"
    }
  ],
  "total": 150,
  "limit": 50,
  "offset": 0
}
```

**Features**:
- Returns transactions where user is either sender or receiver
- Includes usernames for better readability
- `isSender` flag indicates transaction direction
- Supports pagination with limit/offset
- Returns total transaction count

---

## Frontend Implementation

### 1. API Integration
**File**: `frontend/src/apis/api.js`

```javascript
export const getTransactionHistory = (limit = 50, offset = 0) => {
  const token = sessionStorage.getToken("token");
  return API.get("/account/history", {
    params: { limit, offset },
    headers: { authorization: `Bearer ${token}` }
  });
}
```

### 2. Transaction History Component
**File**: `frontend/src/components/TransactionHistory.jsx`

**Features**:
- Display transactions in a responsive table
- Show transaction type (Transfer/Deposit) with color coding
- Display sender/receiver relationship with directional arrows
- Color-coded amounts (red for outgoing, green for incoming)
- Formatted date/time display
- Pagination controls (Next/Previous buttons)
- Loading states and error handling
- Shows transaction count information

### 3. Transaction History Page
**File**: `frontend/src/pages/TransactionHistory.jsx`

Wrapper component that includes:
- Topbar for navigation
- TransactionHistory component
- Proper layout and spacing

### 4. Navigation
**File**: `frontend/src/components/topbar.jsx`

Added "History" button next to Logout for easy access to transaction history.

**Routing**: `http://localhost:5173/history`

---

## Files Created/Modified

### Backend Files:
- ✅ **Created**: `backend/routes/account/history.js` - History endpoint
- ✅ **Modified**: `backend/routes/index.js` - Registered history route

### Frontend Files:
- ✅ **Created**: `frontend/src/components/TransactionHistory.jsx` - Main component
- ✅ **Created**: `frontend/src/pages/TransactionHistory.jsx` - Page wrapper
- ✅ **Modified**: `frontend/src/apis/api.js` - Added API call
- ✅ **Modified**: `frontend/src/App.jsx` - Added route & import
- ✅ **Modified**: `frontend/src/components/topbar.jsx` - Added history button

---

## Usage Instructions

### For Users:
1. Click the **"History"** button in the topbar
2. View all transactions (both sent and received)
3. Use **"Next"** and **"Previous"** buttons to navigate through pages
4. Each transaction shows:
   - Type (Transfer or Deposit)
   - Direction (sent to/received from)
   - Amount (+ for received, - for sent)
   - Exact timestamp
   - Completion status

### API Usage Examples:

**Get first 50 transactions**:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/v1/account/history
```

**Get 25 transactions starting from offset 50**:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/v1/account/history?limit=25&offset=50
```

---

## Features

✅ **Transaction Filtering**: Shows only transactions involving the authenticated user
✅ **Pagination**: Efficient data loading with limit/offset
✅ **User-Friendly UI**: Color-coded types and directional indicators
✅ **Complete History**: Shows both deposits and transfers
✅ **Responsive Design**: Works on desktop and mobile
✅ **Error Handling**: Displays errors and loading states
✅ **Security**: Token-based authentication required
✅ **Performance**: Database indexes on sender_id and receiver_id for fast queries

---

## Integration Steps (Quick Summary)

1. Database table already created ✅
2. Backend API endpoint created ✅
3. Frontend API integration added ✅
4. UI component created ✅
5. Route configured ✅
6. Navigation updated ✅
7. Ready to use!

---

## Example Transaction Display

| Type | From / To | Amount | Date & Time | Status |
|------|-----------|--------|-------------|--------|
| Transfer | → jane_smith | -₹500.00 | 2024-04-17 10:30:45 | completed |
| Transfer | ← john_doe | +₹1000.00 | 2024-04-16 15:20:30 | completed |
| Deposit | Deposit | +₹5000.00 | 2024-04-16 12:00:00 | completed |

---

## Next Steps (Optional Enhancements)

- Add transaction filters (by type, date range, amount)
- Export transaction history to CSV/PDF
- Add transaction search by username
- Implement real-time transaction notifications
- Add transaction details modal with more information
- Implement transaction status tracking (pending, failed, etc.)
