resource "aws_subnet" "public-1" {
    vpc_id = aws_vpc.dailyfix_vpc.id
    cidr_block = "10.0.0.0/24"
    availability_zone = "ap-south-1a"
}

resource "aws_subnet" "public-2" {
    vpc_id = aws_vpc.dailyfix_vpc.id
    cidr_block = "10.0.1.0/24"
    availability_zone = "ap-south-1b"
}


resource "aws_subnet" "private-1" {
    vpc_id = aws_vpc.dailyfix_vpc.id
    cidr_block = "10.0.2.0/24"
    availability_zone = "ap-south-1a"
}


resource "aws_subnet" "private-2" {
    vpc_id = aws_vpc.dailyfix_vpc.id
    cidr_block = "10.0.3.0/24"
    availability_zone = "ap-south-1b"
}


