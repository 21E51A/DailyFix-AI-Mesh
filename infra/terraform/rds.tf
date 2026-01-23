resource "aws_db_subnet_group" "db_subnet_group" {
  name = "dailyfix-db-subnet-group"

  subnet_ids = [
    aws_subnet.private-1.id,
    aws_subnet.private-2.id
  ]

  tags = {
    Name = "dailyfix-db-subnet-group"
  }
}

resource "aws_db_instance" "mysql" {
  allocated_storage    = 20
  engine               = "mysql"
  instance_class       = "db.t3.micro"
  db_name              = "dailyfix"
  username             = "admin"
  password             = "Akash2003"

  skip_final_snapshot  = true
  publicly_accessible  = false

  db_subnet_group_name = aws_db_subnet_group.db_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
}
