# Ride-Sharing Application

## Problem Statement

Develop a ride-sharing application with the following features:

### Features

1. **User Roles:** Users can either offer a shared ride (Driver) or consume a shared ride (Passenger).

2. **Ride Selection:** Users can search and select from multiple available rides on a route with the same source and destination.

### Requirements

#### User Management

Implement functionality to add user details.

```python
add_user(user_detail)
```

#### Vehicle Management

Implement functionality to add vehicle details for users.

```python
add_vehicle(vehicle_detail)
```

#### Ride Offering

Allow users to offer a shared ride on a route with specific details.

```python
offer_ride(ride_detail)
```

#### Ride Selection

Users can select a ride from multiple offered rides using a selection strategy based on preferred vehicle or most vacant seats.

```python
select_ride(source, destination, seats, selection_strategy)
```

#### Ride Management

Implement functionality to end a ride. Users can offer a ride for a given vehicle only when there are no active offered rides for that vehicle.

```python
end_ride(ride_details)
```

#### Statistics

Retrieve and display total rides offered/taken by all users.

```python
print_ride_stats()
```
