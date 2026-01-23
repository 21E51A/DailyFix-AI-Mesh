############################
# Elastic IP for NAT
############################
resource "aws_eip" "nat_eip" {
  domain = "vpc"

  tags = {
    Name = "dailyfix-nat-eip"
  }
}

############################
# NAT Gateway (Public Subnet AZ1)
############################
resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public-1.id

  tags = {
    Name = "dailyfix-nat-gateway"
  }

  depends_on = [aws_internet_gateway.igw]
}

############################
# Private Route Table
############################
resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.dailyfix_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw.id
  }

  tags = {
    Name = "dailyfix-private-rt"
  }
}

############################
# Associate Private Subnets
############################
resource "aws_route_table_association" "private_1_assoc" {
  subnet_id      = aws_subnet.private-1.id
  route_table_id = aws_route_table.private_rt.id
}

resource "aws_route_table_association" "private_2_assoc" {
  subnet_id      = aws_subnet.private-2.id
  route_table_id = aws_route_table.private_rt.id
}
